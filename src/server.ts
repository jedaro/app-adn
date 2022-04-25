import express from 'express';
import routes from './routes/routes';
import morgan from 'morgan';
import http from 'http';
import * as dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import { apiDocument } from './api/documentation';

require('./db/database')

dotenv.config();

const app = express();


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocument))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});


app.use('/', routes);

// Errors
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 3001;
httpServer.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

export = httpServer
