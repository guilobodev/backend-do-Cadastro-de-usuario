import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

import { PrismaClient } from '@prisma/client'

import cors from 'cors'
app.use(cors())


const prisma = new PrismaClient()

app.use(express.json());



app.listen(3000, function (){
    console.log("porta rodando na 3000");
})

app.post("/post", async (req,res) => {
    await prisma.atendimento.create({
        data: {
            name: req.body.name,
            servico: req.body.servico,
            canal: req.body.canal
        }
    })

    res.send("Usuario cadastrado com sucesso");
})

app.get("/usuarios", async (req, res) => {
    const result = await prisma.atendimento.findMany()
    res.json(result)
})

app.put("/put/:id", async (req,res) => {
    const {id} = req.params;
    await prisma.atendimento.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: req.body.name,
            servico: req.body.servico,
            canal: req.body.canal
        }
    })

    res.send("Usuario atualizado com sucesso");
})


app.delete("/delete/:id", async (req,res) => {
    const {id} = req.params;
    await prisma.atendimento.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.status(204).json({message: "Usuario deletado com sucesso"});
   
})
