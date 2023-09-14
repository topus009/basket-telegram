import {FastifyListenOptions} from "fastify";
import healthCheck from 'fastify-healthcheck';

const port = parseInt(process.env.PORT || "3001", 10);
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
const serverOpts: FastifyListenOptions = {
  port,
  host,
}
const serverListen = (app: FASTIFY_APP) => {
  app.listen(serverOpts, (err: Error | null, address: string) => {
    console.log("Listening on port", port)

    if (err) {
      app.log.error(err)
      console.log(err)
      process.exit(1)
    }
  });
}

const addHealthCheckToApp = (app: FASTIFY_APP) => {
  app.register(healthCheck)
}

export {
  serverListen,
  addHealthCheckToApp,
}
