// Nossa API até então havia sido construída com um baco de dados improvisado 
// Agora vamos fazer de verdade com um banco de dados PostgreSQL

import Fastify from 'fastify';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Carregando as variáveis de ambiente do .env
dotenv.config();



const fastify = Fastify({
  logger: true
})



// Conexão com o Neon PostgreSQL
const sql = neon(process.env.DATABASE_URL); 




// Lista alimentos
fastify.get('/alimentos', async (request, reply) => {
    const alimentos = await sql `SELECT * FROM alimentos`;
    return reply.status(200).send(alimentos)
})





// Adiciona alimentos 
fastify.post("/alimentos", async (request, reply) => {
    const {nome, peso, ptn, carb, fat, kcal} = request.body 

    await sql `INSERT INTO alimentos (nome, peso, ptn, carb, fat, kcal) 
    VALUES (${nome}, ${peso}, ${ptn}, ${carb}, ${fat}, ${kcal})`;

    return reply.status(201).send({message: "Alimento inserido com sucesso"})
})






// Edita alimentos
fastify.put("/alimentos/:id", async (request, reply) => {
    const alimentoID = request.params.id
    const {nome, peso, ptn, carb, fat, kcal} = request.body 

    await sql `UPDATE alimentos set nome = ${nome}, ${peso}, 
    ${ptn}, ${carb}, ${fat} WHERE id = ${alimentoID}`

    return reply.status(204).send({message: "Alimento atualizado com suceso"})
})





fastify.delete("/alimentos/:id", async (request, reply) => {
    const alimentoID = request.params

    await sql `DELETE FROM alimentos WHERE id = ${alimentoID}`

    return reply.status(204).send({message: "Alimento excluído com sucesso"})
})