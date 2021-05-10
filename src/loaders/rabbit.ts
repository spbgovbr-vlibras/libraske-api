import amqp from 'amqplib';

const AMQ_URI = process.env.RABBITMQ || 'amqp://localhost';

async function rabbitConnection() {
  const amqpConnection = await amqp.connect(AMQ_URI);
  const amqpChannel = await amqpConnection.createChannel();

  return { amqpConnection, amqpChannel };
}

export default rabbitConnection;
