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

class ReceiverMessage {
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
      const queue = idSession;

      const frameImage = Buffer.from(fs.readFileSync(imagePath)).toString(
        'base64',
      );

      const data: IMessage = {
        idSession,
        idFrame,
        frameImage,
      };

      const message = Buffer.from(
        typeof data === 'object' ? JSON.stringify(data) : data,
      );

      this.channel.sendToQueue(queue, Buffer.from(message));
      // console.log(' [x] Sent %s', message);
      // console.log(idSession);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ReceiverMessage;
