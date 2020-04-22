import * as express from 'express';

import { ENCRYPTION_SECRET } from './util/secrets';

// Middlewares
import middlewares from './config/middlewares';
import db from './config/db/index';

// API Routes
import ApiRoutes from './api';

const app = express();

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', ENV);

// const whitleListDomain = [
// 	`http://localhost:${PORT}`
// 	// 'http://alloweddomain.com'
// ];

// Middlewares configuration
middlewares.config(app);
db();
app.use('/api', ApiRoutes);

export default app;
