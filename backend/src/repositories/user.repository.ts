import { prisma } from "../db/prisma";

export interface createUserDTO{
    username: string
    email: string
    password: string
    photo?: string
}

export const createUserRepository = async (body: createUserDTO) => prisma.user.create({ data: body });

export const findUserByEmail = async (email: string) => prisma.user.findUnique({
    where:{
        email
    }
});

export const findUserByUsername = async (username: string) => prisma.user.findUnique({
    where:{
        username
    }
});


