### Projeto realizado como estudante na [Trybe](https://www.betrybe.com/).

---

# Boas vindas ao repositório do projeto Trybe Futebol Clube!
---

### O que foi desenvolvido:

- A realização da dockerização dos apps, network, volume e compose;
- A modelagem de dados com MySQL através do Sequelize;
- A criação e associação de tabelas usando models do sequelize;
- A construção de uma API REST com endpoints para consumir os models criados;
- A construção de um CRUD com TypeScript, utilizando ORM;
- Teste de integração no backend;

---

### Proposta do projeto: 

Uma criação de uma API que deve ser consumida por um front-end já disponibilizado.

---
### Antes de utilizar o projeto:

- Confira os arquivos package.json, nesses arquivos existem todos os scripts que o projeto necessita.
- É importante ter o docker instalado na máquina.
- Importante ter a extensão do docker no vscode para entrar nos logs dos containers.

---

### Para utilizar o projeto :
- `git clone git@github.com:AiramToscano/Trybe-Futebol-Clube.git`
- `npm install`
- `npm run compose:up:dev` - Com esse comando irá subir o docker do mysql, backend e o frontend.

obs: Caso o npm install não instale as dependências do backend e do frontend, é importante entrar nas pastas e rodar o comando npm install localmente em cada pasta.
- `npm run compose:down:dev` - Com esse comando irá parar os containers criados.

### Para rodar os testes no backend :
- `npm run test`
obs: Importante está na pasta de backend do projeto.

---

### Preview do front end ja disponibilizado :

![Trybe Futebol Clube](https://github.com/AiramToscano/Trybe-Futebol-Clube/blob/airamtoscano/tfc.png)

