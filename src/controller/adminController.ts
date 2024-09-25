import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

const prisma = new PrismaClient({ errorFormat: "minimal" })

const createAdmin = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name
        const email: string = req.body.email
        const password: string = req.body.password

        const findEmail = await prisma.admin
            .findFirst({
                where: { id: Number(email) }
            })
        if (findEmail) {
            return res.status(400)
                .json({ message: `Email has exists` })
        }
        const hashPassword = await bcrypt.hash(password, 12) // hash menggunakan 2 parameter (password adalah bentuk asli) (12 adalah mengacak sebnayak 12x)
        const newAdmin = await prisma.admin.create({ //npm i bcrypt // npm i --save-dev @types/bcrypt
            data: {
                name, email, password: hashPassword
            }
        })
        return res.status(200)
            .json({
                message: `New admin has been register`,
                data: newAdmin
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const readAdmin = async (req: Request, res: Response) => {
    try {
        const search = req.query.search
        // get all medicine 
        const allAdmin = await prisma.admin
            .findMany({
                where: {
                    OR: [
                        { name: { contains: search?.toString() || "" } }
                    ]
                }
            })
        return res.status(200)
            .json({
                message: `Admin has been retrieved`,
                data: allAdmin
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const updateAdmin = async (req: Request, res: Response) => {
    try {
        // membaca id obat yang di kirim ke parameter url
        const id = req.params.id

        // check existing medicine based on id
        const findAdmin = await prisma.admin
            .findFirst({
                where: { id: Number(id) }
            })
        if (!findAdmin) { //! not
            return res.status(200)
                .json({ message: `Admin is not found` })
        }

        //read a properti of medicine from req.body
        const { name, email, password } = req.body

        // update medicine
        const saveAdmin = await prisma.admin
            .update({
                where: { id: Number(id) },
                data: {
                    name: name ? name : findAdmin.name, // jika ada name di body akan dirubah, jika tidak akan menggunakna nama lama
                    email: email ? email : findAdmin.email,
                    password: password ?
                        await bcrypt.hash(password, 12)
                        : findAdmin.password
                }
            })
        return res.status(200)
            .json({
                message: `Admin has been updated`,
                data: saveAdmin
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const deleteAdmin = async (req: Request, res: Response) => {
    try {
        //  read of medicine  from request
        const id = req.params.id

        // check existing medicine 
        const findAdmin = await prisma.admin
            .findFirst({
                where: { id: Number(id) }
            })
        if (!findAdmin) { //! not
            return res.status(200)
                .json({ message: `Admin is not found` })
        }

        //delete medicine
        const saveAdmin = await prisma.admin
            .delete({
                where: { id: Number(id) }
            })
        return res.status(200)
            .json({
                message: `Admin has been removed`,
                data: saveAdmin
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

// function for log in (authentication)
const authentication = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        //check existing email
        const findAdmin = await prisma.admin.findFirst({
            where: { email }
        })

        if (!findAdmin) {
            return res.status(200)
                .json({ message: `Email not registred` })
        }

        const isMatchPassword = await bcrypt.compare(password, findAdmin.password)

        if (!isMatchPassword) {
            return res.status(200)
                .json({ message: `Invalid password` })
        }


        //prepare to generate token using JWT
        const payload = {
            name: findAdmin.name,
            email: findAdmin.email
        }
        const signature = process.env.SECRET || ``

        const token = Jwt.sign(payload, signature)

        return res.status(200)
            .json({ logged: true, token, id: findAdmin.id, name: findAdmin.name, email: findAdmin.email })

    } catch (error) {
        return res.status(500)
            .json(error)
    }
}
export { createAdmin, readAdmin, updateAdmin, deleteAdmin, authentication }