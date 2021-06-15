import { tmpFolder } from '@config/uploadConfig';
import fs from 'fs';
import path from 'path';
import Rabbitmq from 'src/loaders/Rabbitmq';

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

const QUEUE = process.env.RABBITMQ_QUEUE_SENDER || 'frame_sender';

const assertQueueOptions = { durable: false };
const sendQueueOptions = { persistent: true };

class SenderMessage {
  async execute({
    idSession,
    idFrame,
    frameImageFilename,
  }: IRequest): Promise<void> {
    try {
      const channel = Rabbitmq.getSenderChannel;

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
      await channel.assertQueue(QUEUE, assertQueueOptions);
      channel.sendToQueue(QUEUE, Buffer.from(bufferedData), sendQueueOptions);
      console.log(
        ` [x] Sent { idSession: ${idSession}, idFrame: ${idFrame}, imagePath: ${imagePath} } - ${Date.now()}`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default SenderMessage;
