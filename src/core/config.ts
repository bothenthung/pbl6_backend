import * as dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  jwtSecret: process.env.JWT_SECRET as string,
  dbName: process.env.DB_NAME as string,
  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbHost: process.env.DB_HOST as string,
  dbPort: process.env.DB_PORT || 3306,
}

export default serverConfig;