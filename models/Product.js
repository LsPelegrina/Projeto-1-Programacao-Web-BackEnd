const { connect } = require("../db/conn");

class Product {
    constructor(title, price, description, sellerCnpj) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.sellerCnpj = sellerCnpj;
    }

    validate() {
        if (!this.title || this.price <= 0 || !this.sellerCnpj) {
            throw new Error("Produto inválido: título, preço positivo e CNPJ são obrigatórios.");
        }
    }

    async save() {
        const db = await connect();
        
        const seller = await db.collection("sellers").findOne({ cnpj: this.sellerCnpj });
        if (!seller) throw new Error("Vendedor não encontrado. Não é possível cadastrar o produto.");

        const collection = db.collection("products");
        return await collection.insertOne({
            title: this.title,
            price: this.price,
            description: this.description,
            sellerCnpj: this.sellerCnpj,
            createdAt: new Date()
        });
    }
}

module.exports = Product;