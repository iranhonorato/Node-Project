import DatabaseMemory from './database_local.js'
import Fastify from 'fastify'



const fastify = Fastify({
  logger: true
})


const database = new DatabaseMemory()



// Lista alimentos
fastify.get('/alimentos', async (request, reply) => {
    return database.list()
})



// Adicona alimentos
fastify.post('/alimentos', async (request, reply) => {
    // Nossa requisição tipo post
    const {
        "nome": nome, 
        "peso": peso, 
        "ptn": ptn, 
        "carb": carb,
        "fat": fat, 
        "kcal": kcal
        } = request.body 

    database.add({
        "nome": nome, 
        "peso": peso, 
        ptn,           // Formatei diferente só pra ficar na memória que não tem diferença 
        carb,          // Mas só funciona se as chaves e valores tiverem o mesmo nom como foi declarado logo acima 
        fat, 
        kcal
    })

    return reply.status(201).send("Alimento adicionado com sucesso")
})






// Edita aliemntos
fastify.put('/alimentos/:id', async (request, reply) => {
    const alimentoID = request.params.id
    const data = {
        "nome": nome, 
        "peso": peso, 
        "ptn": ptn, 
        "carb": carb,
        "fat": fat, 
        "kcal": kcal
        } = request.body 

    database.update(alimentoID, data)
    return reply.status(204).send("Alimento atualizado com sucesso")
})







// Deleta alimentos
fastify.delete('/alimentos/:id', async (request, reply) => {
    const alimentoID = request.params.id

    database.delete(alimentoID)

    return reply.status(204).send("Alimento deletado com sucesso!")
})









fastify.listen({ port: 777 }, async (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})