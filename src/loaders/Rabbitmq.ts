import { Channel, ChannelModel, connect } from "amqplib";
import RabbitConsumer from "../services/ReceiverMessageService";

interface IDefaultChannels {
  senderChannel: Channel;
  receiverChannel: Channel;
}

class RabbitmqServer {
  private uri: string;
  private connection!: ChannelModel;
  private senderChannel!: Channel;
  private receiverChannel!: Channel;

  private retryDelay = 5000;
  private connecting = false;

  constructor() {
    this.uri = process.env.RABBITMQ || "amqp://localhost";
  }

  public async createRabbitDefaultUsage(): Promise<IDefaultChannels> {
    await this.connectWithRetry();

    await RabbitConsumer.execute();

    console.log("RabbitMQ started!");

    return {
      senderChannel: this.senderChannel,
      receiverChannel: this.receiverChannel,
    };
  }

  // CONEXÃO COM RETRY 
  private async connectWithRetry(): Promise<void> {
    if (this.connecting) return;
    this.connecting = true;

    while (true) {
      try {
        console.log("Connecting to RabbitMQ...");

        this.connection = await connect(this.uri);

        this.connection.on("close", () => {
          console.error("RabbitMQ connection closed. Retrying...");
          this.reconnect();
        });

        this.connection.on("error", (err) => {
          console.error("RabbitMQ error:", err.message);
        });

        await this.createChannels();

        console.log("RabbitMQ connected!");

        this.connecting = false;
        return;
      } catch {
        console.error(`Failed to connect. Retry in ${this.retryDelay / 1000}s`);
        await this.delay(this.retryDelay);
      }
    }
  }

  private async reconnect() {
    this.senderChannel = undefined as any;
    this.receiverChannel = undefined as any;

    await this.delay(this.retryDelay);
    await this.connectWithRetry();
  }

  // CHANNELS
  private async createChannels(): Promise<void> {
    this.senderChannel = await this.connection.createChannel();
    this.receiverChannel = await this.connection.createChannel();
  }

  // UTIL
  private delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // GETTERS SEGUROS
  get getSenderChannel(): Channel {
    if (!this.senderChannel) throw new Error("Sender channel not ready");
    return this.senderChannel;
  }

  get getReceiverChannel(): Channel {
    if (!this.receiverChannel) throw new Error("Receiver channel not ready");
    return this.receiverChannel;
  }
}

export default new RabbitmqServer();
