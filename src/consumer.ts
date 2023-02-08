import { Channel, connect, Connection, ConsumeMessage } from 'amqplib';
import amqp, { Message } from 'amqplib/callback_api'


const init = async(url: string): Promise<Connection> => {
  return connect(url);
}

const consumer = async (amqpUrl: string, queueName: string): Promise<any|Channel> => {
  const connect = await init(amqpUrl);

  return connect.createChannel().then(chan => {
    chan.assertQueue(queueName, { durable: true })
    return Promise.resolve(chan);
  });
}


const createMQConsumer = async (amqpUrl: string, queueName: string): Promise<Channel> => {
  return await consumer(amqpUrl, queueName);
};

  // return () => {
  //   amqp.connect(amqpUrl, (errConn, conn) => {
  //     if (errConn) {
  //       throw errConn
  //     }
      
  //     conn.createChannel((errChan, chan) => {
  //       if (errChan) {
  //         throw errChan
  //       }

  //       console.log('Connected to RabbitMQ')
  //       chan.assertQueue(queueName, )
  //       chan.consume(queueName, (msg: Message | null) => {
  //         if (msg) {
  //           console.log('message received');

  //           const msgContent = msg.content.toString().trim();
  //           const parsed = JSON.parse(msgContent);

  //           switch (parsed.action) {
  //             case 'REGISTER':
  //               console.log('Consuming REGISTER action', parsed.data)
  //               break
  //             case 'LOGIN':
  //               console.log('Consuming LOGIN action', parsed.data)
  //               break
  //             default:
  //               console.log('action default');
  //               break
  //           }
  //         }
  //       }, { noAck: true })
  //     })
  //   })
  // }
//}

export default createMQConsumer