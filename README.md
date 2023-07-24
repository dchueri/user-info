
# User Info Api
![Badge Versão](https://img.shields.io/badge/VERSION-1.0.0-blue?style=for-the-badge)

## Index

* [Descrição](#descrição)
* [Iniciando](#iniciando)
	* [Preparando o ambiente](#preparando-o-ambiente)
  * [Utilizando Docker](#utilizando-docker)
* [Documentação](#documentação)
* [Testes](#testes)
* [Regras de negócio](#regras-de-negócio)
* [Tecnologias](#tecnologias)
* [Autor](#autor)

## Descrição

O User Info é uma API para gerenciamento de usuários. Onde é possível visualizar, adicionar, editar ou excluir usuários.

## Iniciando

### Preparando o ambiente
Clone o repositório:

    git clone https://github.com/dchueri/user-info.git

Iniciando a api:

    cd user-info
    yarn env:generate      // Cria os arquivos .env
    cd server
    yarn
    yarn start:dev

PS.: Lembre-se de criar e configurar os arquivos `.env`. Existe um arquivo .env.example com as variáveis de ambiente utilizadas.

### Utilizando Docker:
   
    cd user-info
    yarn env:generate      // Cria os arquivos .env
    yarn docker:build
    yarn docker:up
    
## Documentação
Acesse a documentação através do endpoint `/docs` na rota do "server".

Ex.:

    localhost:3000/docs

## Regras de negócio
Foram adicionadas algumas regras de negócio como:
 - Apenas a roda `/users/create` e `/auth/login` são públicas;
 - O mesmo e-mail não pode ser utilizado para dois usuários diferentes;
 - Toda deleção por meio da API é feita por meio de soft-delete(exclusão lógica).

## Testes
Para executar os testes automatizados da aplicação acesse a pasta `server` e execute o comando:
    
    yarn test

## Tecnologias

* TypeScript
* NestJS
* TypeORM
* MySQL 8.0
* Jest

## Autor

[<img src="https://avatars.githubusercontent.com/u/84249430?s=400&u=b789830e57ccc23a4d4d758542785461dd656b5f&v=4" width=115><br><sub>Diego  Chueri</sub>](https://github.com/dchueri) 
