import { App } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3010;

new App().start(PORT);
