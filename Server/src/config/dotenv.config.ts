import { config } from 'dotenv';

config();

export const { PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, SMTP_HOST, SMTP_PORT, SMTP_PASSWORD, SMTP_USER, API_URL } = process.env;
