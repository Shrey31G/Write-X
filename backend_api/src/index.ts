import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user';
import { postRouter } from './routes/posts';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/posts", postRouter);



export default app
