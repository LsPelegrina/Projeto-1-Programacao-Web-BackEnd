# 🛒 E-commerce Library - Projeto 1 (Back-End)

Este projeto consiste em uma biblioteca de classes desenvolvida em **Node.js** para gerenciamento de um ecossistema de E-commerce. O objetivo principal é fornecer uma interface de acesso ao banco de dados **MongoDB**, encapsulando a lógica de negócio e garantindo a integridade dos dados através de validações rigorosas e tratamento de exceções.

---

**Autor:** Lucas de Souza Pelegrina  
**Disciplina:** Programação Web Back-End

---

## 🚀 Funcionalidades e Requisitos Atendidos

- **Arquitetura MVC:** Separação clara entre Modelos (entidades e banco) e Controllers (fluxo e lógica).
- **Entidades Implementadas:** 
  - `User`: Cadastro de clientes com validação de CPF, E-mail e Nome.
  - `Seller`: Cadastro de vendedores/lojas com validação de CNPJ.
  - `Product`: Cadastro de produtos com vínculo obrigatório a um vendedor existente.
- **Validação de Dados:** 
  - Verificação de campos obrigatórios.
  - Regex para garantir nomes apenas com letras e formatos de e-mail válidos.
  - Verificação de duplicidade (CPF e E-mail únicos no banco).
- **Tratamento de Exceções:** Uso extensivo de blocos `try/catch` para capturar e reportar erros de conexão ou de lógica sem interromper a execução do sistema.
- **Interação com SGBD:** Métodos de Inserção, Busca, Atualização e Deleção utilizando o driver oficial do MongoDB.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **MongoDB** (Driver oficial v7.2.0)
- **Dotenv** (Gerenciamento de variáveis de ambiente)

---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado:
- **Node.js** (v16 ou superior)
- **Instância do MongoDB** (Local ou MongoDB Atlas)

---

## 🔧 Configuração e Instalação

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/LsPelegrina/Projeto-1-Programacao-Web-BackEnd.git
   cd e-commerce
   ```
2. **Instalar Dependências:**
    ```bash
   npm install
   ```
3. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e preencha com as suas credenciais:
   ```env
   MONGO_URI=sua_string_de_conexao_aqui
   DB_NAME=ecommerce_db
   ```

# 🏃 Como Executar a Demonstração
Para rodar o script que demonstra todos os casos de uso (CRUD completo e tratamentos de erro), execute o comando:

```bash
node index.js
```

# O que será exibido no terminal:
Confirmação de conexão com o banco de dados.

Logs de sucesso para cadastros válidos.

Mensagens de erro detalhadas para tentativas de cadastro inválido (ex: CPF curto ou E-mail duplicado).

Tabelas formatadas (console.table) mostrando o estado atual das coleções no banco.

Confirmação de limpeza de dados após a execução dos testes.

---

# 📁 Estrutura do Projeto

index.js: Ponto de entrada e fluxo da demonstração.

Controllers/MainController.js: Coordena as operações entre o terminal e os modelos.

models/: Contém as classes User.js, Seller.js e Product.js com suas validações e persistência.

db/conn.js: Gerencia a conexão Singleton com o MongoDB.

.env: (Não incluso no commit) Arquivo de configuração de chaves.

---

Nota: O método clearDatabase() no final do script index.js foi implementado para garantir que cada execução da demonstração comece em um ambiente limpo. Caso deseje persistir os dados para conferência manual via MongoDB Compass, basta comentar a linha correspondente no index.js.
