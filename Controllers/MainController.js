const User = require("../models/User");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const { connect } = require("../db/conn");

class MainController {
    static async registerUser(data) {
        try {
            const user = new User(data.name, data.cpf, data.email, data.password);
            user.validate();
            const res = await user.save();
            console.log(`Usuário [${data.name}] cadastrado com sucesso! ID: ${res.insertedId}`);
        } catch (error) {
            console.error(`Erro ao cadastrar usuário: ${error.message}`);
        }
    }

    static async updateUser(cpf, newData) {
        try {
            console.log(`\nTentando atualizar dados do CPF: ${cpf}...`);
            const db = await connect();
            const collection = db.collection("users");

            const result = await collection.updateOne(
                { cpf: cpf },
                { $set: { ...newData, updatedAt: new Date() } }
            );

            if (result.matchedCount > 0) {
                console.log("Dados atualizados com sucesso!");
            } else {
                console.log("Usuário não encontrado para atualização.");
            }
        } catch (error) {
            console.error(`Erro na atualização: ${error.message}`);
        }
    }

    static async registerSeller(data) {
        try {
            const seller = new Seller(data.name, data.cnpj, data.email);
            seller.validate();
            await seller.save();
            console.log(`Vendedor [${data.name}] registrado com sucesso!`);
        } catch (error) {
            console.error(`Erro ao cadastrar vendedor: ${error.message}`);
        }
    }

    static async addProduct(data) {
        try {
            const product = new Product(data.title, data.price, data.description, data.sellerCnpj);
            product.validate();
            await product.save();
            console.log(`Produto [${data.title}] adicionado à loja!`);
        } catch (error) {
            console.error(`Erro ao adicionar produto: ${error.message}`);
        }
    }

    static async showAll(collectionName) {
        try {
            const db = await connect();
            const data = await db.collection(collectionName).find().toArray();
            console.log(`\nListando ${collectionName.toUpperCase()}:`);
            console.table(data);
        } catch (error) {
            console.error(`Erro ao buscar dados: ${error.message}`);
        }
    }

    static async deleteItem(collectionName, query) {
        try {
            const db = await connect();
            const res = await db.collection(collectionName).deleteOne(query);
            if (res.deletedCount > 0) console.log(`🗑️ Item removido de ${collectionName}.`);
            else console.log(`Item não encontrado em ${collectionName}.`);
        } catch (error) {
            console.error(`Erro ao deletar: ${error.message}`);
        }
    }

    static async clearDatabase() {
        try {
            console.log("\nIniciando limpeza completa do banco de dados...");
            const db = await connect();

            const collections = ["users", "sellers", "products"];

            for (const colName of collections) {
                const res = await db.collection(colName).deleteMany({});
                console.log(`Waste: ${res.deletedCount} documentos removidos de [${colName}].`);
            }

            console.log("Banco de dados limpo com sucesso!");
        } catch (error) {
            console.error(`Erro ao limpar o banco: ${error.message}`);
        }
    }
}

module.exports = MainController;