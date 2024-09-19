import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "../services/user.service";
import { createUserDTO } from "../repositories/user.repository";
import fs from "fs";
import path from "path";

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
    const body: createUserDTO = request.body as createUserDTO;

    try {
        const data = await request.file();

        if (data) {
            const uploadDir = path.join(__dirname, "../../uploads"); // Pasta de uploads

            // Garante que a pasta de uploads existe
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, {recursive: true});
            }

            const filename = `${Date.now()}-${data.filename}`; // Cria um nome único para o arquivo
            const filepath = path.join(uploadDir, filename); // Caminho completo do arquivo

            // Salva o arquivo na pasta
            const fileStream = fs.createWriteStream(filepath);
            data.file.pipe(fileStream);

            body.photo = filepath; // Adiciona o caminho da foto ao body
        }

        const user = await createUserService(body);

        reply.code(201).send(user);
    } catch (error) {
        console.error(error);
        reply.code(500).send({ error});
    }
    
} 