import fastify from "fastify";
import multipart from "fastify-multipart";
import { userRouter } from "../routes/user.router";

const app = fastify();

app.register(multipart);
app.register(userRouter);

app.listen({
    port: 3000,
}).then(() => {
    console.log("Servidor rodando!")
});