import { Channel, Connection, connect } from 'amqplib';

import RabbitConsumer from '../services/ReceiverMessageService';

interface IDefaultChannels {
  senderChannel: Channel;
  receiverChannel: Channel;
}

class RabbitmqServer {
  private uri: string;

  private connection: Connection;

  private senderChannel: Channel;

  private receiverChannel: Channel;

  constructor() {
    this.uri = process.env.RABBITMQ || 'amqp://localhost';
  }

  public async createRabbitDefaultUsage(): Promise<IDefaultChannels> {
    await this.createConnection();

    const { senderChannel, receiverChannel } = await this.createChannel();

    await RabbitConsumer.execute();

    return { senderChannel, receiverChannel };
  }

  private async createConnection(): Promise<void> {
    this.connection = await connect(this.uri);
  }

  private async createChannel(): Promise<IDefaultChannels> {
    if (!(this.senderChannel && this.receiverChannel)) {
      this.senderChannel = await this.connection.createChannel();
      this.receiverChannel = await this.connection.createChannel();
    }

    return {
      senderChannel: this.senderChannel,
      receiverChannel: this.receiverChannel,
    };
  }

  // Getters
  get getSenderChannel(): Channel {
    return this.senderChannel;
  }

  get getReceiverChannel(): Channel {
    return this.receiverChannel;
  }
}

export default new RabbitmqServer();
