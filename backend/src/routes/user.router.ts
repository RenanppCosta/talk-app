import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user.controller";


export async function userRouter(fastify: FastifyInstance) {
    fastify.post("/user", createUserController);
}