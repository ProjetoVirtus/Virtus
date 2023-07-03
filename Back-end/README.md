![Back-end](../Imagens/Back-end.png)

## Counteúdo
- [Introdução](#introdução)
- [Técnologias Utilizadas](#técnologias-utilizadas)
- [Estrutura](#estrutura)
- [Configuração](#configuração)

## Introdução
Esse repositório contém o código-fonte do back-end, construído com o Java Spring. Ele nos forneceu um conjunto abrangente de ferramentas e recursos para criar uma API RESTful de forma rápida, robusta e escalável para atender às necessidades do nosso projeto. Com o Java Spring, conseguimos construir um back-end poderoso e eficiente que se comunica perfeitamente com o front-end para fornecer uma experiência rápida e intuitiva

## Técnologias Utilizadas
- ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
    - Nós utilizamos Java para o nosso back-end devido à sua capacidade de ser uma linguagem poderosa, escalável e portátil, que nos permitiu criar um back-end robusto e eficiente. Além disso, conseguimos aproveitar sua ampla variedade de recursos e integrar uma variedade de bibliotecas e ferramentas conforme necessário

- ![Spring](https://img.shields.io/badge/Spring-6DB33F.svg?style=for-the-badge&logo=Spring&logoColor=white)
    - Utilizamos o framework Spring para acelerar o desenvolvimento de nosso back-end e aumentar a produtividade. Ele nos oferceu um conjunto abrangente de ferramentas e recursos para criar rapidamente uma API RESTful robusta e escalável
    - 

## Configuração
> **⚠️** Certifique-se que você tenha o [Java Devlopment Kit (JDK)](https://www.oracle.com/java/technologies/downloads/#java17) versão 17 instalado em sua máquina

Abra um terminal ou o prompt de comando e navegue até o diretório do projeto. Em seguida, execute o seguinte comando para iniciar o servidor:

para macOS ou Linux:

```
./mvnw spring-boot:run
```

para Windows:
```
mvnw spring-boot:run
```

Esse comando usará o Maven Wrapper incluído no projeto para baixar automaticamente a versão correta do Maven e inciar a aplicação. Após isso aguarde enquanto o Maven baixa as dependências do projeto e inicia a aplicação. Quando a aplicação estiver em execução, você verá uma mensagem semelhante a ```Started Application in **X** seconds``` no terminal. Isso indica que a aplicação foi iniciada e está pronta para o uso. Após todas as etapas funcionarem, navegue até ```http://localhost:8080``` em seu navegador para acessar a aplicação. 

> **⚠️** Note que ao acessar, sua requisição será rejeitada automaticamente por 401(Unauthorized) pois você não possui um token de acesso(X-API-KEY). Para obte-lo você pode acessar o arquivo [AuthenticationService](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/Services/AuthenticationService.java) e copiar o token de la. O valor padrão é **Baeldung**. Você precisará desse valor no na propriedade X-API-KEY do header da requisição para acessar a aplicação

> **⚠️** Além disso é importante ressaltar que você também deve colocar o valor do token na variável de ambiente do front-end na propriedade **BACKEND_KEY**. Verifique o tópico de [Configurações](https://github.com/ProjetoVirtus/Virtus/blob/main/Front-End/README.md#configura%C3%A7%C3%A3o) e substitua o valor de **BACKEND_KEY** para o valor do token

## Estrutura
- [Configuration](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Configuration)
    - Contém as classes de configuração do projeto
- [Controller](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Controller)
    - Contém as classes que são responsáveis por receber as requisições HTTP e direcioná-las para o serviço apropriado. Ele também é responsável por retornar a resposta HTTP apropriada para o cliente
- [Data](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Data)
    - Contém as classes que são responsáveis por representar os dados que serão fixos armazenados no banco de dados, similar ao ViewObject
- [Exceptions](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Exception)
    - Contém as classes que são responsáveis por representar as exceções que podem ocorrer durante a execução da aplicação
- [Models](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Models)
    - Contém as classes que são responsáveis por representar as entidades que serão armazenadas no banco de dados
- [Repository](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Repository)
    - Contém as classes que são responsáveis por realizar as operações de CRUD no banco de dados
- [Security](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Security)
    - Contém as classes que são responsáveis por realizar a autorização de requisições na API
- [Services](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/Services)
    - Contém as classes que são responsáveis por realizar as operações de negócio da aplicação
- [ViewObject](https://github.com/ProjetoVirtus/Virtus/tree/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject)
    - Contém as classes que são responsáveis por representar os dados que serão retornados para o cliente 

## Endpoints

### Autenticação
- POST /auth/signup
    - Descrição: realiza o cadastro de um novo usuário
    - Recebe uma requisição JSON com o seguinte corpo:
        - `email`(String): e-mail
        - `password`(String): senha
        - `gender`(Integer): gênero
        - `birth`(DATE AAAA-MM-DD): data de nascimento
        - `isProfessional`(Boolean): se é profissional ou não
        - `actuationArea`(String): área de atuação
        - `OABCode`(String): código da OAB
    - Exemplo de um corpo de requisição:
        ```json
        {
            "phoneNumber": "+55 (11) 12345-6789",
            "email": "usuario@exemplo.com",
            "password": "senhamuitoforte",
            "gender": 1,
            "birth": "2023-07-03",
            "isProfessional": true,
            "actuationArea": "Família",
            "OABCode": "123456"
        }
        ```
    - Resposta: retorna um código de status HTTP 201 (Created) para indicar que o usuário foi criado com sucesso. Não há corpo na resposta

- POST /auth/signin
    - Descrição: realiza o login de um usuário
    - Recebe uma requisição JSON com o seguinte corpo:
        - `email`(String): e-mail
        - `password`(String): senha
    - Exemplo de um corpo de requisição:
        ```json
        {
            "email": "email@exemplo.com",
            "password": "12345678"
        }
        ```
    - Resposta: retorna um código de status HTTP 200 (OK) caso encontre o usuário que tenha o mesmo e-mail e a senha da requisição para indicar que o usuário foi logado com sucesso. Retorna um corpo JSON do objeto [UserViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/UserViewObject.java)
    - Exemplo do corpo de resposta:
        ```json
        {
            "id": 1,
            "firstName": "Nome",
            "lastName": "Sobrenome",
            "email": "email@exemplo.com",
            "birth": "2023-03-25",
            "isProfessional": true,
            "actuationArea": "Família",
            "OABCode": "123456",
            "phoneNumber": "+55 (11) 12345-6789",
            "genderData": {
                "id": 0,
                "name": "Outros"
            }
        }
        ```

## Casos
- GET /case
    - Descrição: retorna uma lista de casos
    - Não requer um corpo JSON
    - Resposta: retorna um código de status HTTP 200(OK) com uma lista de [CaseData](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/Data/CaseData.java)
    - Exemplo do corpo de resposta:
    ```json
    [
        {
            "caseId": 0,
            "caseName": "Outros"
        },
        {
            "caseId": 1,
            "caseName": "Família"
        },
        {
            "caseId": 2,
            "caseName": "Consumidor"
        },
        {
            "caseId": 3,
            "caseName": "Previdência"
        },
        {
            "caseId": 4,
            "caseName": "Trabalhista"
        }
    ]
    ```
- GET /case/{caseId}
    - Descrição: retorna um caso específico que contém o caseId igual ao parâmetro `caseId` da URL
    - Parâmetros:
        - `caseId`(Integer): id do caso
    - Não requer um corpo JSON
    - Resposta: retorna um código de status HTTP 200(OK) com um objeto [CaseData](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/Data/CaseData.java)
    - Exemplo do corpo de resposta:
    ```json
    {
        "caseId": 1,
        "caseName": "Família"
    }
    ```

## Comentários
- POST /comment/{postId}/{userId}
    - Descrição: realiza um novo comentário em um post referenciado pelo parâmetro `postId` da URL, criado pelo usuário referenciado pelo parâmetro `userId` da URL
    - Parâmetros:
        - `postId`(Integer): id do post
        - `userId`(Integer): id do usuário
    - Recebe uma requisição JSON com o seguinte corpo:
        - `content`(String): texto do comentário
    - Exemplo de um corpo de requisição:
        ```json
        {
            "content": "Texto do comentário"
        }
        ```
    - Resposta: retorna um código de status HTTP 201(Created) para indicar que o comentário foi criado com sucesso. Não há corpo na resposta 

- PUT /comment/{postId}/{userId}/{commentaryId}
    - Descrição: atualiza um comentário referenciado pelo parâmetro `commentaryId` da URL, criado pelo usuário referenciado pelo parâmetro `userId` da URL, em um post referenciado pelo parâmetro `postId` da URL
    - Parâmetros:
        - `postId`(Integer): id do post
        - `userId`(Integer): id do usuário
        - `commentaryId`(Integer): id do comentário
    - Recebe uma requisição JSON com o seguinte corpo:
        - `content`(String): texto do comentário
    - Exemplo de um corpo de requisição:
        ```json
        {
            "content": "Texto do comentário editado"
        }
        ```
    - Resposta: retorna um código de status HTTP 200(OK) para indicar que o comentário foi atualizado com sucesso. Não há corpo na resposta

- DELETE /coment/{postId}/{userId}/{commentaryId}
    - Descrição: deleta um comentário referenciado pelo parâmetro `commentaryId` da URL, criado pelo usuário referenciado pelo parâmetro `userId` da URL, em um post referenciado pelo parâmetro `postId` da URL
    - Parâmetros:
        - `postId`(Integer): id do post
        - `userId`(Integer): id do usuário
        - `commentaryId`(Integer): id do comentário
    - Não requer um corpo JSON
    - Resposta: retorna um código de status HTTP 204(NO CONTENT) para indicar que o comentário foi deletado com sucesso. Não há corpo na resposta

## Publicações
- GET /post/search?page={pagina}&search={titulo}&caseId={caseIds[]}
    - Descrição: retorna uma lista paginada de publicações, opicionalmente filtrada por termo e pesquisa e/ou IDs de casos
    - Parâmetros:
        - `page`(Integer): número da página
        - `search`(String): termo de pesquisa
        - `caseId`(Integer[]): IDs dos casos
        > **:warning:** Sempre quando for informar a página, não se esqueça de subtrair 1.<br> Exemplo: página 1 fica página 0.
    - Não requer um corpo JSON
    - Resposta: retorna um código de status HTTP 200(OK) com uma lista paginada de objetos [PostViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/PostViewObject.java)
    - Exemplo do corpo de resposta:
    ```json
    {
        "content": [
            {
                "id": 2,
                "caseData": {
                    "caseId": 1,
                    "caseName": "Família"
                },
                "title": "Isso aqui é um título",
                "description": "Isso aqui é uma descrição",
                "profissionalNeeded": false,
                "user": {
                    "id": 2,
                    "firstName": "Outro",
                    "lastName": "Exemplo",
                    "email": "email@exemplo.com",
                    "birth": "2023-03-03T00:00:00.000+00:00",
                    "isProfessional": false,
                    "actuationArea": null,
                    "phoneNumer": "+55 (11) 11111-1111",
                    "genderData": {
                        "genderId": 0,
                        "genderName": "Outros"
                    },
                    "oabcode": null
                },
                "createdAt": "2023-07-03T15:12:24.538058",
                "solution": false
            },
            {
                "id": 1,
                "caseData": {
                    "caseId": 4,
                    "caseName": "Trabalhista"
                },
                "title": "Título",
                "description": "Descrição",
                "profissionalNeeded": false,
                "user": {
                    "id": 1,
                    "firstName": "Nome",
                    "lastName": "Sobrenome",
                    "email": "email@teste.com",
                    "birth": "2023-03-03T00:00:00.000+00:00",
                    "isProfessional": false,
                    "actuationArea": null,
                    "phoneNumer": "+55 (11) 11111-1111",
                    "genderData": {
                        "genderId": 1,
                        "genderName": "Masculino"
                    },
                    "oabcode": null
                },
                "createdAt": "2023-06-28T17:13:06.454294",
                "solution": false
            }
        ],
        "pageable": {
            "sort": {
                "empty": false,
                "sorted": true,
                "unsorted": false
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 8,
            "paged": true,
            "unpaged": false
        },
        "last": true,
        "totalPages": 1,
        "totalElements": 2,
        "size": 8,
        "number": 0,
        "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
        },
        "first": true,
        "numberOfElements": 2,
        "empty": false
    }
    ```

- GET /post/{postId}
    - Descrição: retorna uma publicação referenciada pelo parâmetro `postId` da URL
    - Parâmetros:
        - `postId`(Integer): id da publicação
    - Não requer um corpo JSON
    - Resposta: retorna um código de status HTTP 200(OK) com um objeto [SpecificPostViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/SpceificPostViewObject.java)
    - Exemplo do corpo de resposta:
    ```json
    {
        "id": 1,
        "caseData": {
            "caseId": 4,
            "caseName": "Trabalhista"
        },
        "title": "Título",
        "description": "Descrição",
        "profissionalNeeded": false,
        "comments": [],
        "solution": null,
        "createdAt": "2023-03-03T00:00:00.000+00:00",
        "postOwner": {
            "id": 1,
            "firstName": "Nome",
            "lastName": "Sobrenome",
            "email": "email@teste.com",
            "birth": "2023-03-03T00:00:00.000+00:00",
            "isProfessional": false,
            "actuationArea": null,
            "phoneNumer": "+55 (11) 11111-1111",
            "genderData": {
                "genderId": 1,
                "genderName": "Masculino"
            },
            "oabcode": null
        },
        "createdAt": "2023-06-28T17:13:06.454294",
        "solution": false
    }
    ```

- PUT /post/{userId}/{postId}
    - Descrição: atualiza uma publicação referenciada pelo parâmetro `postId` da URL, criada pelo usuário referenciado pelo parâmetro `userId` da URL
    - Recebe uma requisição com o seguinte corpo:
        - `title`(String): título da publicação
        - `description`(String): descrição da publicação
    - Exemplo de corpo de requisição:
    ```json
    {
        "title": "Novo título",
        "description": "Nova descrição"
    }
    ``` 
    - Parâmetors
        - `userId`(Integer): id do usuário
        - `postId`(Integer): id da publicação
    - Resposta: retorna um código de status HTTP 200(OK). Não contém corpo na resposta

- DELETE /post/{userId}/{postId}
    - Descrição: deleta uma publicação referenciada pelo parâmetro `postId` da URL, criada pelo usuário referenciado pelo parâmetro `userId` da URL
    - Não requer um corpo JSON
    - Parâmetros:
        - `userId`(Integer): id do usuário
        - `postId`(Integer): id da publicação
    - Resposta: retorna um código de status HTTP 204(NO CONTENT). Não contém corpo na resposta 

- POST /post
    - Descrição: cria uma nova publicação
    - Recebe JSON com o seguinte corpo:
        - `userId`(Integer): id do usuário
        - `title`(String): título da publicação
        - `description`(String): descrição da publicação
        - `caseId`(Integer): id da área de atuação
        - `profissionalNeeded`(Boolean): indica se a publicação precisa de um profissional
    - Exemplo de corpo de requisição:
    ```json
    {
        "userId": 1,
        "title": "Título",
        "description": "Descrição",
        "caseId": 4,
        "profissionalNeeded": false
    }
    ```
    - Resposta: retorna um código de status HTTP 201(CREATED) com um objeto [SpecificPostViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/SpceificPostViewObject.java) da nova publicação criada
    - Exemplo do corpo da resposta:
    ```json
    {
        "id": 1,
        "caseData": {
            "caseId": 4,
            "caseName": "Trabalhista"
        },
        "title": "Título",
        "description": "Descrição",
        "profissionalNeeded": false,
        "comments": [],
        "solution": null,
        "createdAt": "2023-03-03T00:00:00.000+00:00",
        "postOwner": {
            "id": 1,
            "firstName": "Nome",
            "lastName": "Sobrenome",
            "email": "",
            "birth": "2023-03-03T00:00:00.000+00:00",
            "isProfessional": false,
            "actuationArea": null,
            "phoneNumer": "+55 (11) 11111-1111",
            "genderData": {
                "genderId": 1,
                "genderName": "Masculino"
            },
            "oabcode": null
        },
        "createdAt": "2023-06-28T17:13:06.454294",
        "solution": false
    }

## Solução
- PUT /post/solution/{userId}/{postId}/{commentaryId}
    - Descrição: Deixa a solução da publicação `postId` criada pelo usuário `userId` como o comentário `commentaryId`
    - Não requer um corpo JSON
    - Parâmetros
        - `userId`(Integer): id do usuário
        - `postId`(Integer): id da publicação
        - `commentaryId`(Integer): id do comentário
    - Resposta: retorna um código de status HTTP 200(OK). Não contém corpo na resposta

- DELETE /post/solution/{userId}/{postId}/
    - Descrição: Remove a solução da publicação `postId` criada pelo usuário `userId`
    - Não requer um corpo JSON
    - Parâmetros:
        - `userId`(Integer): id do usuário
        - `postId`(Integer): id da publicação
    - Resposta: retorna um código de status HTTP 204(NO CONTENT). Não contém corpo na resposta

## Usuário
- GET /users
    - Descrição: retorna uma lista de todos os usuários cadastrados
    - Não requer um corpo JSON
    - Não requer parâmetros
    - Resposta: retorna um código de status HTTP 200(OK) com uma lista de objetos [UserViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/UserViewObject.java)
    - Exemplo do corpo da resposta:
    ```json
    [
        {
            "id": 1,
            "firstName": "Nome",
            "lastName": "Sobrenome",
            "email": "email@teste.com",
            "birth": "2023-03-03T00:00:00.000+00:00",
            "isProfessional": false,
            "actuationArea": null,
            "phoneNumer": "+55 (11) 11111-1111",
            "genderData": {
                "genderId": 1,
                "genderName": "Masculino"
            },
            "oabcode": null
        },
        {
            "id": 2,
            "firstName": "Outro",
            "lastName": "Exemplo",
            "email": "email@exemplo.com",
            "birth": "2023-03-03T00:00:00.000+00:00",
            "isProfessional": false,
            "actuationArea": null,
            "phoneNumer": "+55 (11) 11111-1111",
            "genderData": {
                "genderId": 0,
                "genderName": "Outros"
            },
            "oabcode": null
        }
    ]
    ```

- GET /users/{userId}
    - Descrição: retorna um usuário com o id definido pelo parâmetro `userId`
    - Não requer um corpo JSON
    - Parâmetros:
        - `userId`(Integer): id do usuário
    - Resposta: retorna um código de status HTTP 200(OK) com um objeto [UserViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/UserViewObject.java) do usuário
    - Exemplo do corpo da resposta:
    ```json
    {
        "id": 1,
        "firstName": "Nome",
        "lastName": "Sobrenome",
        "email": "email@teste.com",
        "birth": "2023-03-03T00:00:00.000+00:00",
        "isProfessional": false,
        "actuationArea": null,
        "phoneNumer": "+55 (11) 11111-1111",
        "genderData": {
            "genderId": 1,
            "genderName": "Masculino"
        },
        "oabcode": null
    }
    ```

- PUT /users/{userId}
    - Descrição: atualiza os dados do usuário com o id definido pelo parâmetro `userId`
    - Recebe JSON com o seguinte corpo:
        - `firstName`(String): primeiro nome do usuário
        - `lastName`(String): sobrenome do usuário
    - Exemplo de corpo de requisição:
    ```json
    {
        "firstName": "Exemplo",
        "lastName": "De edição"
    }
    ```
    - Parâmetros:
        - `userId`(Integer): id do usuário
    - Resposta: retorna um código de status HTTP 200(OK) com um objeto [UserViewObject](https://github.com/ProjetoVirtus/Virtus/blob/main/Back-end/src/main/java/com/projetovirtus/app/rest/ViewObject/UserViewObject.java) do usuário atualizado
    - Exemplo do corpo da resposta:
    ```json
    {
        "id": 1,
        "firstName": "Exemplo",
        "lastName": "De edição",
        "email": "email@teste.com",
        "birth": "2023-03-03T00:00:00.000+00:00",
        "isProfessional": false,
        "actuationArea": null,
        "phoneNumer": "+55 (11) 11111-1111",
        "genderData": {
            "genderId": 1,
            "genderName": "Masculino"
        },
        "oabcode": null
    }
    ```