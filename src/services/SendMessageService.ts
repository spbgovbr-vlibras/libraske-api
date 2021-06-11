import { Channel } from 'amqplib';

import RabbitServer from '../queue/Rabbitmq';

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
  private sendChannel: Channel;

  constructor(sendChannel: Channel) {
    this.sendChannel = sendChannel;
  }

  async execute({ queue, idFrame, frameImageUri }: IRequest): Promise<void> {
    try {
      const data: IMessage = {
        idFrame,
        frameImageUri,
      };

      const message = Buffer.from(
        typeof data === 'object' ? JSON.stringify(data) : data,
      );

      this.sendChannel.sendToQueue(queue, Buffer.from(message));
    } catch (error) {
      console.log(error);
    }
  }
}

export default SendingMessage;
