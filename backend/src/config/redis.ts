import Redis from 'ioredis';
import { createClient } from 'redis';
import dotenv from "dotenv";

dotenv.config();

const username ="default";
const password ="bVKlkHYwh4qeYljjLEBOnEskkiSz1nEZ";
const endpoint ="redis-13697.c301.ap-south-1-1.ec2.redns.redis-cloud.com:13697";


const redisClient = createClient({
  url:`redis://${username}:${password}@${endpoint}`
})

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export function connect() {
  console.log(process.env.REDIS_USERNAME);
  redisClient.connect();
}

export default redisClient;

// scard → sCard
// hset → hSet
// sadd → sAdd
// smembers → sMembers
// hgetall → hGetAll
