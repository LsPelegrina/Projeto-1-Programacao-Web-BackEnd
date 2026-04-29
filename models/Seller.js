const { connect } = require("../db/conn");

class Seller {
    constructor(name, cnpj, email) {
        this.name = name;
        this.cnpj = cnpj;
        this.email = email;
    }

    validate() {
        if (!this.name || !this.cnpj || !this.email) {
            throw new Error("Campos obrigatórios do vendedor ausentes.");
        }
        if (this.cnpj.length !== 14) {
            throw new Error("CNPJ inválido (deve ter 14 dígitos).");
        }
    }

    async save() {
        const db = await connect();
        const collection = db.collection("sellers");

        const existing = await collection.findOne({ cnpj: this.cnpj });
        if (existing) throw new Error("CNPJ já cadastrado.");

        return await collection.insertOne({
            name: this.name,
            cnpj: this.cnpj,
            email: this.email,
            createdAt: new Date()
        });
    }
}

module.exports = Seller;