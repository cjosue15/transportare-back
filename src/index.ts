import dotenv from 'dotenv';

dotenv.config();

import { Server } from './server/server';

function main() {
    const server = new Server();
    server.listen();
}

main();
