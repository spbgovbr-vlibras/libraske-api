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

          //TODO Remover essa parte
          // idGameSession = '2e4a051e-7c4d-4bcd-9e8f-4038c4520356';
          // pontuation = Math.round(Math.random() * 100);


          try {
            await GameSessionService.addPontuation({ idGameSession, pontuation });
          } catch (err) {
            console.log(err);

          }

          console.log('cabou');

        },
        consumeOptions,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ReceiverMessageService();
