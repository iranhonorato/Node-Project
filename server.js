import Fastify from 'fastify'
import DatabaseMemory from "database_local.js"





const fastify = Fastify({
    logger: true
})

const database = new DatabaseMemory()


// Lista alimentos
fastify.get('/alimentos', async (request, reply) => {
})



// Adicona alimentos
fastify.post('/alimentos', async (request, reply) => {
})



// Edita aliemntos
fastify.put('/alimentos/:id', async (request, reply) => {
})





// Deleta alimentos
fastify.delete('/alimentos/:id', async (request, reply) => {
})





fastify.listen({ port: 777 }, async (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})