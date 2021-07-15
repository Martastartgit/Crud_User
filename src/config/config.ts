export const config = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'uf7e^WaiUGFSA7fd8&^dadh',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '3fhfsdjfkf$$uIEFSHFKdf',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '10d',

  JWT_CONFIRM_EMAIL_SECRET: process.env.JWT_CONFIRM_EMAIL_SECRET || 'd%^&fsdnFFkmsdkfHJFAJa',
  JWT_CONFIRM_EMAIL_LIFETIME: process.env.JWT_CONFIRM_EMAIL_LIFETIME || '24h',

  JWT_PASS_RESET_SECRET: process.env.JWT_PASS_RESET_SECRET || '4234&&34refFSDJNK7sdf$%^',
  JWT_PASS_RESET_LIFETIME: process.env.JWT_PASS_RESET_LIFETIME || '24h',

  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/newProject',

  ROOT_EMAIL: process.env.ROOT_EMAIL || 'liubapetrivska4@gmail.com',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'liuba1967',
  ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'mail',

  SaltRounds: 10

};
