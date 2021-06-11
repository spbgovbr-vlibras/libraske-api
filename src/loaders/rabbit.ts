import { Channel, Connection, connect } from 'amqplib';

interface IChannel {
  channel: Channel;
}

class RabbitmqServer {
  private uri: string;

  private conn: Connection;

  private channel: Channel;

  constructor() {
    this.uri = process.env.RABBITMQ || 'amqp://localhost';
  }

  async start(): Promise<IChannel> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();

    return { channel: this.channel };
  }
}

export default RabbitmqServer;
