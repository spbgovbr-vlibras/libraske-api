import fs from 'fs';
import path from 'path';
import Rabbitmq from '../loaders/Rabbitmq';
import { GAME_IMAGES_STORAGE } from '@config/applicationFolders';

interface IRequest {
  idSession: string;
  idFrame: string;
  frameImageFilename: string;
  songId: number;
}

interface IMessage {
  idSession: string;
  idFrame: string;
  frameImage: string;
  videoId: number;
}

const QUEUE = process.env.RABBITMQ_QUEUE_SENDER || 'frame_sender';

const assertQueueOptions = { durable: false };
const sendQueueOptions = { persistent: true };

class SenderMessage {
  async execute({
    idSession,
    idFrame,
    frameImageFilename,
    songId
  }: IRequest): Promise<void> {
    try {
      const channel = Rabbitmq.getSenderChannel;

      if (!fs.existsSync(GAME_IMAGES_STORAGE)) {
        fs.mkdirSync(GAME_IMAGES_STORAGE, { recursive: true });
      }

      const imagePath = path.resolve(GAME_IMAGES_STORAGE, frameImageFilename);
      const frameImage = Buffer.from(fs.readFileSync(imagePath)).toString(
        'base64',
      );

      const data: IMessage = {
        idSession,
        idFrame,
        videoId: songId,
        frameImage
      };

      const bufferedData = Buffer.from(
        typeof data === 'object' ? JSON.stringify(data) : data,
      );

      await channel.assertQueue(QUEUE, assertQueueOptions);
      channel.sendToQueue(QUEUE, Buffer.from(bufferedData), sendQueueOptions);
      fs.unlinkSync(imagePath);

      console.log(
        ` [x] Sent { idSession: ${idSession}, idFrame: ${idFrame}, imagePath: ${imagePath} } - ${Date.now()}`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getNumberOfConsumers() {
    const channel = Rabbitmq.getSenderChannel;
    const { consumerCount } = await channel.assertQueue(QUEUE, assertQueueOptions);
    return consumerCount;
  }
}

export default SenderMessage;
