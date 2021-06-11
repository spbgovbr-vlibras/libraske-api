import RabbitServer from '../loaders/rabbit';

interface IRequest {
  queue: string;
  idFrame: string;
  frameImageUri: string;
}

interface IMessage {
  idFrame: string;
  frameImageUri: string;
}

class SendingMessage {
  async execute({ queue, idFrame, frameImageUri }: IRequest): Promise<void> {
    try {
      const data: IMessage = {
        idFrame,
        frameImageUri,
      };

      const message = Buffer.from(
        typeof data === 'object' ? JSON.stringify(data) : data,
      );

      const rabbitServer = new RabbitServer();
      const { channel } = await rabbitServer.start();

      channel.sendToQueue(queue, Buffer.from(message));
    } catch (error) {
      console.log(error);
    }
  }
}

export default SendingMessage;
