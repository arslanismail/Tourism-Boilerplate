import { Application } from 'express';
import * as express from 'express';
import parsers from './parsers.middleware';
import custom from './custom.middleware';
// import headers from './header.middleware';

// Web Related Middleware Depends on req.session (express-session/cookie-session)
// import lusca from './lusca.middleware';

const config = (app: Application) => {
	parsers.config(app);
	custom.config(app);
	app.use(express.static('public'));
	// headers.config(app);
};

export default { config };
