import { randomUUID } from "node:crypto"

// A importação deve ser assim por conta com ES Module
export default class DatabaseMemory {
    #alimentos = new Map()


    list () {
        return Array.from(this.#alimentos)
    }


    add (alimento) {
        const alimentoId = randomUUID()
        this.#alimentos.set(alimentoId, alimento)
    }



    update (id, alimento) {
        this.#alimentos.set(id, alimento)
    }



    delete (id) {
        this.#alimentos.delete(id)
    }


}