import rabbitConnection from '../loaders/rabbit';

interface IRequest {
  id: string;
  idSong: string;
  idSession: string;
  idFrame: number;
  frame: string;
}

class SendingMessage {
  async execute({
    id,
    idSong,
    idFrame,
    idSession,
    frame,
  }: IRequest): Promise<void> {
    try {
      const { amqpConnection, amqpChannel: channel } = await rabbitConnection();

      const queue = idSession;

      const data = {
        id,
        idSong,
        idFrame,
        frame,
      };

      await channel.assertQueue(queue, {
        durable: false,
      });

      const msg = Buffer.from(
        typeof data === 'object' ? JSON.stringify(data) : data,
      );

      await channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);
      amqpConnection.close();
    } catch (error) {
      console.log(error);
    }
  }
}

export default SendingMessage;
