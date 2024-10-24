import dotenv from 'dotenv'

dotenv.config()

const Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3002,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/spotify',
  PRIVATEKEY: process.env.PRIVATEKEY || 'thangdeptrai!@#$',
  SECERETKEY: process.env.SECERETKEY || 'thNAGDSADSADC324RFWDE32121',
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '1m',
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '1d',
  CONFIRM_EMAIL_EXPIRATION: process.env.CONFIRM_EMAIL_EXPIRATION || '2m',
  RESET_PASSWORD_TOKEN_EXPIRATION: process.env.RESET_PASSWORD_TOKEN_EXPIRATION || '2m',
  EMAIL: process.env.EMAIL || '',
  PASSWORDEMAIL: process.env.PASSWORDEMAIL || '',
  URL_APP: process.env.URL_APP || '',
  REDIS_HOST: process.env.REDIS_HOST || 'redis-13953.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com',
  REDIS_PORT: process.env.REDIS_PORT || 13953,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'RQAwhM21ZA9FuXIC9xdndms4dEuLrzbu',
  REDIS_URL: process.env.REDIS_URL || 'RQAwhM21ZA9FuXIC9xdndms4dEuLrzbu',
  CLOUD_NAME: process.env.CLOUD_NAME || 'ddbiksyk2',
  API_KEY: process.env.API_KEY || '757256832782843',
  API_SECRET: process.env.API_SECRET || 'N31TA2zpwAbrXGRaLu1WfNYNLEc',
  FRONT_END_URL: process.env.FRONT_END_URL,
}

export default Config
