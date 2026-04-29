const MainController = require("./Controllers/MainController");

async function runDemo() {
    console.log("INICIANDO DEMONSTRAÇÃO DO SISTEMA E-COMMERCE\n");

    await MainController.registerUser({
        name: "Lucas Pelegrina",
        cpf: "12345678901",
        email: "lucas@email.com",
        password: "123"
    });

    await MainController.registerUser({
        name: "João Errado",
        cpf: "123ABC456",
        email: "joao@email.com",
        password: "123"
    });

    await MainController.registerUser({
        name: "Copia do Lucas",
        cpf: "99988877766",
        email: "lucas@email.com",
        password: "123"
    });

    await MainController.updateUser("12345678901", {
        name: "Lucas Pelegrina Atualizado"
    });

    const cnpjExemplo = "11222333000199";
    await MainController.registerSeller({
        name: "TechStore LTDA",
        cnpj: cnpjExemplo,
        email: "contato@techstore.com"
    });

    await MainController.addProduct({
        title: "Teclado Mecânico RGB",
        price: 299.90,
        description: "Teclado switch blue com leds",
        sellerCnpj: cnpjExemplo
    });

    await MainController.addProduct({
        title: "Mouse Gamer 12000 DPI",
        price: 150.00,
        description: "Mouse ergonômico",
        sellerCnpj: cnpjExemplo
    });

    await MainController.showAll("users");
    await MainController.showAll("products");

    await MainController.addProduct({
        title: "Produto Fantasma",
        price: 10.00,
        description: "Teste de erro",
        sellerCnpj: "00000000000000"
    });

    await MainController.deleteItem("users", { cpf: "12345678901" });

    await MainController.showAll("users");

    await MainController.clearDatabase(); // Caso queira ver os dados no banco de dados, comente esta linha professor!

    await MainController.showAll("users");
    await MainController.showAll("sellers");
    await MainController.showAll("products");

    console.log("\nDEMONSTRAÇÃO FINALIZADA E BANCO DE DADOS LIMPO.");
    process.exit(0);
}

runDemo();