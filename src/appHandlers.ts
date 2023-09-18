import { FastifyListenOptions } from 'fastify';
import healthCheck from 'fastify-healthcheck';

const port = parseInt(process.env.PORT || '3001', 10);
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';
const serverOpts: FastifyListenOptions = {
  port,
  host,
};
const serverListen = (app: IFastifyApp) => {
  app.listen(serverOpts, (err: Error | null) => {
    console.log('Listening on port', port);

    if (err) {
      app.log.error(err);
      console.log(err);
      process.exit(1);
    }
  });
};

const addHealthCheckToApp = (app: IFastifyApp) => {
  app.register(healthCheck);
};

export {
  serverListen,
  addHealthCheckToApp,
};
