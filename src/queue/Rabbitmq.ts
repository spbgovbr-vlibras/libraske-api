import { Channel, Connection, connect } from 'amqplib';

class RabbitmqServer {
  private uri: string;

  private conn: Connection;

  private channel: Channel;

  constructor() {
    this.uri = process.env.RABBITMQ || 'amqp://localhost';
  }

  async createConnection(): Promise<void> {
    this.conn = await connect(this.uri);
  }

  async createChannel(channel: Channel): Promise<Channel> {
    if (!channel) {
      this.channel = await this.conn.createChannel();
      return this.channel;
    }

    return channel;
  }
}

export default RabbitmqServer;
