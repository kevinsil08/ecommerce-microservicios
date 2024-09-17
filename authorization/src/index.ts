import express, { Application, Request, Response, NextFunction } from "express";

import { corsMiddleware } from "./config/middleware";
import { registerServices } from './services/registerServices';
import GatewayRouter from "./routes/routesGateway";
import { PORT } from "./config/handlerEnvVar";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(corsMiddleware())
    this.app.disable('x-powered-by')
    registerServices();
  }

  protected routes(): void {

    this.app.route("/").get((req: Request, res: Response) => {
      res.send("API Gateway is running");
    });

    // Middleware para logging (opcional)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });

    this.app.use(GatewayRouter);

  }
}

const port: number = Number(PORT) || 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`✅ API Gateway started successfully in en http://localhost:${port}!`);
});