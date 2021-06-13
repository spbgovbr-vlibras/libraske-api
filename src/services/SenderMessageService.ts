import { tmpFolder } from '@config/uploadConfig';
import { Channel } from 'amqplib';
import fs from 'fs';
import path from 'path';

interface IRequest {
  idSession: string;
  idFrame: string;
  frameImageFilename: string;
}

interface IMessage {
  idSession: string;
  idFrame: string;
  frameImage: string;
}

const QUEUE = process.env.RABBITMQ_SENDER || 'sender';

const assertQueueOptions = { durable: true };
const sendQueueOptions = { persistent: true };

class SenderMessage {
  private channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async execute({
    idSession,
    idFrame,
    frameImageFilename,
  }: IRequest): Promise<void> {
    try {
      const imagePath = path.resolve(tmpFolder, 'img', frameImageFilename);

      const frameImage = Buffer.from(fs.readFileSync(imagePath)).toString(
        'base64',
      );

      const data: IMessage = {
        idSession,
        idFrame,
        frameImage,
      };

      const bufferedData = Buffer.from(
        typeof data === 'object' ? JSON.stringify(data) : data,
      );

      await this.channel.assertQueue(QUEUE, assertQueueOptions);

      this.channel.sendToQueue(
        idSession,
        Buffer.from(bufferedData),
        sendQueueOptions,
      );

      console.log(
        ` [x] Sent { idSession: ${idSession}, idFrame: ${idFrame}, imagePath: ${imagePath} } - ${Date.now()}`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default SenderMessage;
