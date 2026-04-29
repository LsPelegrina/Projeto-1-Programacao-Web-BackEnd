const { connect } = require("../db/conn");

class User {
    constructor(name, cpf, email, password) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }

    validate() {
        if (!this.name || !this.cpf || !this.email) {
            throw new Error("Campos obrigatórios ausentes.");
        }
        // Apenas letras no nome
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(this.name)) {
            throw new Error("O nome deve conter apenas letras.");
        }
        // CPF exatamente 11 dígitos
        if (!/^\d{11}$/.test(this.cpf)) {
            throw new Error("CPF inválido! Deve conter exatamente 11 números.");
        }
        // Formato de e-mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            throw new Error("Formato de e-mail inválido.");
        }
    }

    async save() {
        const db = await connect();
        const collection = db.collection("users");

        const existingCpf = await collection.findOne({ cpf: this.cpf });
        if (existingCpf) throw new Error("Conflito: Este CPF já está cadastrado.");

        const existingEmail = await collection.findOne({ email: this.email });
        if (existingEmail) throw new Error("Conflito: Este e-mail já está em uso.");

        return await collection.insertOne({
            name: this.name,
            cpf: this.cpf,
            email: this.email,
            password: this.password,
            createdAt: new Date()
        });
    }
}

module.exports = User;