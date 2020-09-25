import redisClient from '../redis/redisClient';

/**
 * Tests connection to redis client
 */
describe('## Redis Client Connection Tests ## ', ()  => {
    it('ping should return "PONG" from redis client.', async done => {
        expect.assertions(1);
        function callback(err, result) {
            
            if (err) {
                done(err);
            } else {
                expect(result).toBe("PONG");
                done();
            }
        }

        redisClient.ping(callback);       
    });
});

afterAll(() => redisClient.quit());