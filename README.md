# gerencia_clientes

* Entrar na pasta raiz e executar npm install
* Entrar na pasta forntend e executar npm install, npm run build
* Executar o arquivo start.bat

# Criação da tabela no PostgreSQL
* Foi utilizado uma database com plano free(customer.elephantsql.com)
* DDL CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    coordenada_x FLOAT NOT NULL,
    coordenada_y FLOAT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  # versões da dependencias
  * cors: ^2.8.5
  * express: ^4.18.3
  * pg: ^8.11.3

 # FrontEnd
  * axios: ^1.6.7
  * react: ^18.2.0
  * react-dom: ^18.2.0
  * react-modal: ^3.16.1
  * react-scripts: 5.0.1
  * web-vitals: ^2.1.4"
