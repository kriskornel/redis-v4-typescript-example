// import createMQProducer from './producer'
import { Redis } from 'ioredis';
import createMQConsumer from './consumer'

const { 
    // PORT = 3000,
    REDIS_URL = 'redis://localhost:6379',
    AMQP_URL = 'amqp://127.0.0.1:5672', 
    QUEUE_NAME = 'eventdriven' 
} = process.env;

// const producer = createMQProducer(AMQP_URL, QUEUE_NAME)

async function consumer(): Promise<void> {
    createMQConsumer(AMQP_URL, QUEUE_NAME).then(chan => {
        chan.consume(QUEUE_NAME, async (msg: any) => {
            const redis = await new Redis(REDIS_URL, { keepAlive: 0 });
            redis.on('error', (error) => console.log('err'));

            if (msg) {
                const content = msg.content.toString();
                const parsedContent = JSON.parse(content.trim());

                const keyExist = parsedContent.hasOwnProperty('id');

                if (keyExist) {
                    console.log(keyExist);

                    if (await redis.exists(parsedContent.id)) {
                        console.log('redis already set key ', parsedContent.id);
                    }

                    await redis.set(parsedContent.id, parsedContent.action);
                }

                if (!keyExist) {
                    console.log('not exist');
                }

                // try {
                //     const redisQuit = await redis.quit();
                //     console.log('redis quit');
                // } catch(err) {
                //     console.log('quit err');
                // }
            }
        }, { noAck: true});
    });
}


consumer();


