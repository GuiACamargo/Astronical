# Astronical🌌

Um projeto realizado em dupla para a construção de uma **Rede Social** inspirada no _Twitter_ para a publicação
de postagens relacionadas a **_Astronomia_**.

O projeto foi realizado principalmente com **_Angular, Node.js e MySQL_**, junto com outras diversas
tecnologias listadas que auxiliaram a atingir o nosso objetivo

## Features:

Na parte do **Front-end** o projeto conta com **validação de CPF e utilização de mask** no mesmo, salvamento de
**Token JWT no Local Storage do navegador**, **tratamento de erro**, **animações**, **requests a API da NASA** para a
obtenção do APOD (Atronomic Picture of The Day) diário e de outras datas, **requests a API construída com Node.js**
para o projeto, responsividade com variados tamanhos de telas pois foi desenvolvido com o conceito de **Mobile-First**,
componentes do **Angular Material**, **Pipes do Angular**, **proteção de rotas com Angular Guard**, **Interceptor** e entre muitas outras features.

Na parte do **Back-end** node com express, jwt e mysql

## Start no Projeto

Para iniciar o projeto primeiro baixe ele para a sua máquina, com git clone ou via Zip. Após isso, localize a pasta tanto
do Angular quanto do Node e abra um terminal em cada uma das pastas e execute o comando

```
npm install
```

Assim você instalará todas as dependências necessárias para rodar o projeto.

Após isso no terminal aberto na pasta do Angular execute o comando

```
ng serve
```

para assim iniciar o Front-end do projeto na porta http://localhost:4200. Para iniciar o node, na pasta em que ele
se encontra execute o comando

```
npm run dev
```

iniciando assim o servidor do Back-end, permitindo a execução do projeto completo.



## Start no Projeto Back-End
```
npm install

//para cria banco de dados
npm run migration:run 

//para popular o banco com usuario e publicações
npm run seed
```
```
//login dos usuarios
//admin
email: rafael@email.com
senha: teste123456

//login dos usuarios
//usuario
email: jogao@email.com
senha: teste123456
```

## Tecnologias Utilizadas

### Front-end:

- [Angular](https://angular.io/);
- [Angular Material](https://material.angular.io/);
- [Auth0-JWT](https://www.npmjs.com/package/@auth0/angular-jwt);
- [CPF-CNPJ-Validator](https://www.npmjs.com/package/cpf-cnpj-validator);
- [ngx-mask](https://www.npmjs.com/package/ngx-mask);
- [Typescript](https://www.typescriptlang.org/);
- Local Storage (JWT);
- Outras.

### Back-end:

- Node 
- express
- typeorm
- jsonwebtoken

## Autor e Redes Sociais

Projeto desenvolvido por Francielio Nobrega(Back-end) e Guilherme Albani Camargo(Front-end):

**_Francielio Nobrega_**
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cielio)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cielio/)

**_Guilherme Albani Camargo_**
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GuiACamargo)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilhermecamargodev/)
