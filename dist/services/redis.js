"use strict";
// import redis from 'redis';
// const createRedisClient = async () => {
//     const client = redis.createClient({ url: "" });
//     await client.connect();
//     return client;
// };
// export const redisService = async (input: { key: string; value?: string; type: string }) => {
//     let client;
//     try {
//         client = await createRedisClient();
//         if (input.type === "get") {
//             const getAsync = await client.get.bind(client);
//             const data = await getAsync(input.key);
//             return data ? JSON.parse(data) : false;
//         } else if (input.type === "set" && input.value !== undefined) {
//             const setAsync = await client.set.bind(client);
//             await setAsync(input.key, input.value);
//         }
//     } catch (e) {
//         console.error("Error in Redis service", e);
//         throw e;
//     } finally {
//         if (client) {
//             await client.quit();
//         }
//     }
// };
