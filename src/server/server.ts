import express, { Application } from 'express';
import cors from 'cors';

// Routes
import indexRoutes from '../routes/index.routes';
import personalRoutes from '../routes/personal/personal.routes';

export class Server {
    private app: Application;

    constructor(private PORT?: number | string) {
        this.app = express();
        this.settings();
        this.routes();
    }

    settings(): void {
        this.app.set('port', this.PORT || process.env.PORT);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/personal', personalRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
