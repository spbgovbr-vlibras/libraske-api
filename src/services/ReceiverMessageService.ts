import Rabbitmq from '../loaders/Rabbitmq';
import CreatePontuationService from './CreatePontuationService';

const QUEUE = process.env.RABBITMQ_QUEUE_RECEIVER || 'frame_receiver';

const consumeOptions = { noAck: true };

class ReceiverMessageService {
  async execute(): Promise<void> {
    try {
      const channel = Rabbitmq.getSenderChannel;

      channel.assertQueue(QUEUE, {
        durable: false,
      });

      channel.consume(
        QUEUE,
        async function consume(message) {
          const { idGameSession, pontuation } = JSON.parse(
            message?.content.toString() as string,
          );

          console.log(' [x] Received %s', message?.content.toString());

          await CreatePontuationService.execute({ idGameSession, pontuation });
        },
        consumeOptions,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ReceiverMessageService();
