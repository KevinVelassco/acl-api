import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'local',
  app: {
    port: parseInt(process.env.PORT, 10) || 8080,
    apiKey: process.env.API_KEY,
    maxHitsAllowed: parseInt(process.env.MAX_HITS_ALLOWED) || 1,
    maxHitsTimeRange: parseInt(process.env.MAX_HITS_TIME_RANGE) || 60
  }
}));
