import bcrypt from "bcrypt";
import  { createUserDTO, createUserRepository, findUserByEmail, findUserByUsername } from "../repositories/user.repository";

export const createUserService = async ( body: createUserDTO ) => {
    let { username, email, password, photo} = body;

    if(!username || !email || !password ) throw new Error("Registre todos os campos corretamente");

    const existingUsername = await findUserByUsername(username);

    if(existingUsername) throw new Error("Esse username já está cadastrado.")

    const existingEmail = await findUserByEmail(email);
    
    if(existingEmail) throw new Error("Esse e-mail já está cadastrado.")

    password = bcrypt.hashSync(password, 10);

    const user = await createUserRepository({
        username,
        email,
        password,
        photo
    });

    return user;
}