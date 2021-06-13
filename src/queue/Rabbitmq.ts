import { Channel, Connection, connect } from 'amqplib';

class RabbitmqServer {
  private uri: string;

  private connection: Connection;

  private channel: Channel;

  constructor() {
    this.uri = process.env.RABBITMQ || 'amqp://localhost';
  }

  async createConnection(): Promise<void> {
    this.connection = await connect(this.uri);
  }

  async createChannel(channel: Channel): Promise<Channel> {
    if (!channel) {
      this.channel = await this.connection.createChannel();
      return this.channel;
    }

    return channel;
  }
}

export default new RabbitmqServer();
