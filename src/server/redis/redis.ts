import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 16734,
  password: process.env.REDIS_PASSWORD,
});

const redisCache =(key:string, value:string){
  //TODO: Safe eventId_address (key) with address value
  //TOOD: Save eventId_latlong (key) with latlong value
//  if address of event changes -> requery latlong 
 // else read cache

}
