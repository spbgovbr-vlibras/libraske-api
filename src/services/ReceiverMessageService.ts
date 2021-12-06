import Rabbitmq from '../loaders/Rabbitmq';
import GameSessionService from './GameSessionService';
import env from '../environment/environment'

const QUEUE = env.RABBITMQ_QUEUE_RECEIVER || 'frame_receiver';

const consumeOptions = { noAck: true };

class ReceiverMessageService {
  async execute(): Promise<void> {
    try {
      const channel = Rabbitmq.getReceiverChannel;

      channel.assertQueue(QUEUE, {
        durable: false,
      });

      channel.consume(
        QUEUE,
        async function consume(message) {
          let { idGameSession, pontuation } = JSON.parse(
            message?.content.toString() as string,
          );

          try {
            await GameSessionService.addPontuation({ idGameSession, pontuation });
          } catch (err) {
            console.log(err);
          }
        },
        consumeOptions,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ReceiverMessageService();
