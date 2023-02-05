import redisHelper from "./redis-client";


/**
 * @see https://redis.io/docs/stack/search/configuring/ timeout means time allowed to run query read
 */
async function main(): Promise<any> {
    console.log('start');
    const redis = await redisHelper();
    redis.set('test125', 'ok');

    if(redis.isOpen) {
        console.log('redis is open');
    }
}
/**
 * @terminal  npx ts-node src/infinity.ts 
 * Set timeout 20 `CONFIG SET timeout 20` to reproduce unexpected socket closed 
 * Set timeout 0 `CONFIG SET timeout 0` to remove the socket closed error
 */
main()
    .then(() => console.log('app ok'))
    .catch(err => console.log('main error ', err));
``