require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connect() {
    if (db) return db;

    try {
        const client = await MongoClient.connect(process.env.MONGO_URI);
        
        const dbName = process.env.DB_NAME || 'ecommerce_db';
        db = client.db(dbName);

        console.log(`Conexão estabelecida com o banco: ${dbName}`);
        return db;
    } catch (error) {
        console.error('Erro crítico ao conectar no MongoDB:', error.message);
        
        throw error; 
    }
}

module.exports = { connect };