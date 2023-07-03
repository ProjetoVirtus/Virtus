![Front-end](/Imagens/Front-end.png)

## Conteudo
- [Introdução](#introdução)
- [Configuração](#configuração)
- [Endpoints](#endpoints)
    - [Comentário](#comentário)
    - [Publcação](#publicação)
    - [Solução](#soluçao)
    - [Edição de usuário](#edição-de-usuário)
    - [Registro](#registro)
    - [Login](#login)

## Introdução
Esse repositório é responsável por fornecer uma interface rápida e intuitiva para os usuários interagirem com o nosso sistema. Ele foi construído usando técnologias modernas do React.js e Next.js para fornecer uma experiência rápida e responsiva. Neste repositório, você encontrará informações sobre as tecnologias, os endpoints da API e como o front-end se comunica com o back-end

## Técnologias Utilizadas
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)
    - Utilizamos o HTML5 para estruturar e organizar o conteúdo da nossa aplicação. Com ele, conseguimos fazer com que os navegadores exibam textos, imagens e outros conteúdos de maneira organizada
<br>

- ![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)
    - Utilizamos o CSS3 para estilizar a aparência visual do site. Ele nos permites personalizar as cores, fontes, espaçamento e criar valiações de layout, além de adapta-los a diferentes tamanhos de dispositivos
<br>

- ![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
    - Utilizamos o TailwindCSS para maximizar o potencial do CSS e tornar o desenvolvmento mais rápido e fácil. Ele fornece classes utilitárias que nos ajudam a projetar nossas páginas diretamente dentro do HTML
<br>

- ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
    - Utilizamos o JavasScript para adicionar interatividade e dinamismo ao site. Ele nos permite criar conteúdo que se atualiza automaticamente, além de melhorar a experiência do usuário e tornar o site mais atrante e fácil de usar
<br>

- ![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
    - Utilizamos o React para facilitar a criação de interfaces e aumentar a produtividade no processo de desenvolvimento. Ele permite a simplificação a conexão entre HTML, CSS, JavaScript e todos os componentes da aplicação
<br>

- ![Next.js](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
    - Utilizamos o Next.js por sua facilidade e eficiência. Ele reúne diversas funcionalidades que aleceram o desenvolvimento e fornecem uma estrutura completa para inicializar o projeto. Além disso, também utilizamos a funcionalidade de rotas API do Next.js como uma "camada" antes das informações serem eviadas para o back-end Java.

## Configuração
Para a inicialização do projeto, ele necessita de um arquivo que vai salvar as variaveis importantes. Dentro da pasta raís do front-end, crie um arquivo chamado ```.env.local```, nela você vai colocar:
- NEXTAUTH_SECRET: Chave secreta da autenticação
- BACKEND_URL: URL onde vai ficar localizada a aplicação back-end
- BACKEND_KEY: Chave de acesso para o back-end

Exemplo:
```
NEXTAUTH_SECRET=CHAVE_SECRETA
BACKEND_URL=http://localhost:8080
BACKEND_KEY=CHAVE_ACESSO
```

Após isso, você pode executar o comando
```
npm i
```
para instalar todas as depêndencias do React.js e Next.js. Após a instalação, inicialize o back-end primeiro. Após certificar-se que o back-end está inicializado e funcionando, execute:
```
npm run dev
```
para iniciar a aplicação em ambiente de desenvolvimento

## Endpoints
!!!warning Todos os argumentos retornados pelos endpoints são em forma de JSON. <br> Também considere que todas as requisições são feitas dentro do proprio front-end, caso queira utiliza-las você deve pegar a URL do front-end e inserir a rota /api após ela. <br>Exemplo: o front-end está rodando na URL **http://localhost:300**, você deve executar: **http://localhost:3000/api/...**

### Comentário
- POST /api/commentary/POST
    - Descrição: Cria um novo comentário na publicação referenciado pelo `postId` informado
    - Corpo da requisição: JSON contendo os campos: 
        - `postId`(Integer): id da publicação
        - `content`(String): conteúdo do comentário
    - Exemplo do corpo da requisição: 
    ```JSON
    {
        "postId": 1,
        "content": "Contúdo do comentário"
    }
    ```
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/commentary/POST", {
        method: "POST",
        body: JSON.stringify({
            postId: 1,
            content: "Conteúdo do comentário"
        })
    })
    ```
    - Resposta: JSON com o código de 201(CREATED) confirmando a criação do comentário, incluindo somente o campo de `message`(String)
    - Exemplo de resposta: 
    ```json
    {
        "message": "Comentário adicionado com sucesso"
    }
    ```
- PUT /api/commentary/PUT
    - Descrição: Edita o comentário referenciado pelo `commentaryId` na publicação, que é referenciado pelo `postId`, por fim contendo o conteúdo que é representado pelo `content`
    - Corpo da requisição: JSON contendo os campos:
        - `commentaryId`(Integer):  id do comentário para ser editado
        - `postId`(Integer): id da publicação, onde esse comentário está localizado
        - `content`(String): conteúdo da edição
    - Exemplo de corpo da requisição:
    ```json
    {
        "postId": 1,
        "commentaryId": 1,
        "content": "Conteudo da edição"
    }
    ```
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/commentary/PUT", {
        method: "PUT",
        body: JSON.stringify({
            postId: 1,
            commentaryId: 1,
            content: "Conteudo da edição"
        })
    })
    ```
    - Resposta: JSON com o código de 200(OK) confirmando a edição, incluindo somente o campo de `message`
    - Exemplo de resposta:
    ```json
    {
        "message": "Comentario editado com sucesso"
    }
    ```

### Publicação
- GET /api/post/SEARCH/search?page={pagina}&title={titulo}&caseId={caseId[]}
    - Descrição: Retorna uma lista de publicações de acordo com a página, título e uma lista de Integers que representa os casos
    - Parâmetros:
        - page(Integer): Pagina desejada
        - title(String): Procura as publicações semelhantes ao title
        - caseId(Integer[]): Procura as publicações que contém o caseId(identidade do caso) na lista de caseId
    - Essa requisição não precisa de um corpo JSON
    - Exemplo de requisição(considere que estamos procurando uma publicação com o texto "Duvida" na primeira página, além de especificar que queremos somente os casos que contém o `caseId` de 1 e 4):
    ```javascript
    const response = await fetch("api/post/SEARCH/search?page=1&title=Duvida&caseId=1%2C4",{
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    ``` 
    - Resposta: JSON com o código de 200(OK) confirmando a requisição, retornado uma lista de publicações de acordo com os filtros indicados pelos parâmetros
    - Exemplo de resposta:
    ```json
    "data": [
        {
            "id": 4,
            "caseData": {
                "caseId": 4,
                "caseName": "Trabalhista"
            },
            "title": "Dúvida relacionado a...",
            "description": "Descrição",
            "profissionalNeeded": false,
            "user": {
                "id": 1,
                "firstName": "Nome",
                "lastName": "Sobrenome",
                "email": "usuario1@exemplo.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 0,
                    "genderName": "Outros"
                },
                "oabcode": null
            },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
            "solution": false
        },
        {
            "id": 6,
            "caseData": {
                "caseId": 4,
                "caseName": "Trabalhista"
                },
            "title": "Título da dúvida",
            "description": "Descrição ",
            "profissionalNeeded": false,
            "user": {
                "id": 10,
                "firstName": "Nome",
                "lastName": "Da Silva",
                "email": "usuario2@email.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 2,
                    "genderName": "Feminimo"
                },
                "oabcode": null
                },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
                "solution": true
        }
    ],
    "totalPages": 1,
    "currentPage": 1,
    "empty": false
    ```
- GET /api/post/GET-SPECIFIC

    !!!warning Essa requisição não é mais necessária. Fazemos a requisição pela propria página na hora de carrega-la
    - Descrição: Retorna um objeto da publicação representado pelo parâmetro `postId`
    - Corpo JSON contendo o seguinte campo:
        - `postId`(Integer): id da publicação
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/post/GET-SPECIFIC", {
        method: "GET",
        body: JSON.stringify({
            id: 4
        })
    })
    ```
    - Resposta: JSON com o código 200(OK) confirmando a requisição, retornando a publicação com o ```postId```
    - Exemplo de resposta:
    ```json
    "data": {
        "id": 4,
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
            "email": "usuario1@exemplo.com",
            "birth": "2023-07-23T00:00:00.000+00:00",
            "isProfessional": false,
            "actuationArea": null,
            "phoneNumer": "+55 (11) 12345-6789",
            "genderData": {
                "genderId": 0,
                "genderName": "Outros"
            },
            "oabcode": null
        },
        "createdAt": "2023-07-23T00:00:00.000+00:00",
        "solution": false
    }
    ```
- GET /api/post/GET

    !!!warning Essa rota também não é mais utilizada. Ela foi substítuida pela primeira rota mencionada

    - Descrição: Retorna todas as publicações
    - Não é necesssário um corpo JSON
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/post/GET", {
        method: "GET",
    })
    ```
    - Resposta: JSON com o código 200(OK) com uma lista de todas as publicações que estão dentro da propriedade `data`
    - Exemplo de resposta:
    ```json
    "data": [
        {
            "id": 1,
            "caseData": {
                "caseId": 0,
                "caseName": "Outros"
            },
            "title": "Estou com uma dúvida muito específica...",
            "description": "Descrição",
            "profissionalNeeded": false,
            "user": {
                "id": 1,
                "firstName": "Outro",
                "lastName": "Nome da Silva",
                "email": "usuario14@exemplo.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 0,
                    "genderName": "Outros"
                },
                "oabcode": null
            },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
            "solution": false
        },
        {
            "id": 2,
            "caseData": {
                "caseId": 3,
                "caseName": "Previdência"
            },
            "title": "Dúvida sobre previdência",
            "description": "Descrição",
            "profissionalNeeded": false,
            "user": {
                "id": 1,
                "firstName": "Nome",
                "lastName": "Sobrenome Pereira",
                "email": "usuario16@exemplo.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 0,
                    "genderName": "Outros"
                },
                "oabcode": null
            },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
            "solution": false
        },
        {
            "id": 3,
            "caseData": {
                "caseId": 2,
                "caseName": "Família"
            },
            "title": "Dúvida sobre família",
            "description": "Descrição",
            "profissionalNeeded": false,
            "user": {
                "id": 1,
                "firstName": "Nome",
                "lastName": "Sobrenome Pereira",
                "email": "usuario11@exemplo.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 0,
                    "genderName": "Outros"
                },
                "oabcode": null
            },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
            "solution": false
        },
        {
            "id": 4,
            "caseData": {
                "caseId": 4,
                "caseName": "Trabalhista"
            },
            "title": "Dúvida relacionado a...",
            "description": "Descrição",
            "profissionalNeeded": false,
            "user": {
                "id": 1,
                "firstName": "Nome",
                "lastName": "Sobrenome",
                "email": "usuario21@exemplo.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 0,
                    "genderName": "Outros"
                },
                "oabcode": null
            },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
            "solution": false
        },
        {
            "id": 5,
            "caseData": {
                "caseId": 3,
                "caseName": "Previdência"
            },
            "title": "Uma dúvida aqui",
            "description": "Descrição",
            "profissionalNeeded": false,
            "user": {
                "id": 1,
                "firstName": "Pessoa",
                "lastName": "Silva",
                "email": "usuario51@exemplo.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 0,
                    "genderName": "Outros"
                },
                "oabcode": null
            },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
            "solution": true
        },
        {
            "id": 6,
            "caseData": {
                "caseId": 4,
                "caseName": "Trabalhista"
                },
            "title": "Título da dúvida",
            "description": "Descrição ",
            "profissionalNeeded": false,
            "user": {
                "id": 10,
                "firstName": "Nome",
                "lastName": "Da Silva",
                "email": "usuario23@email.com",
                "birth": "2023-07-23T00:00:00.000+00:00",
                "isProfessional": false,
                "actuationArea": null,
                "phoneNumer": "+55 (11) 12345-6789",
                "genderData": {
                    "genderId": 2,
                    "genderName": "Feminimo"
                },
                "oabcode": null
                },
            "createdAt": "2023-07-23T00:00:00.000+00:00",
                "solution": true
        }
    ],
    "totalPages": 1,
    "currentPage": 1,
    "empty": false
    ```
- POST /api/post/POST
    - Descrição: Cria uma nova publicação
    - Corpo da requisição JSON contendo os seguintes campos:
        - `caseId`(Integer): id do caso
        - `title`(String): título
        - `description`(String): título
        - `professionalNeeded`(Boolean) define se é apenas uma duvida ou se necessita de um profissional
    - Exemplo do corpo JSON
    ```json
    {
        "caseId": 1,
        "title": "Título",
        "description": "Descrição",
        "professionalNeeded": false
    }
    ```
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/post/POST", {
        method: "POST",
        body: JSON.stringify({
            caseId: 1,
            title: "Título",
            description: "Descrição",
            professionalNeeded: false
        })
    })
    ```
    - Resposta: JSON com o código 200(OK) com o corpo sendo a publicação que foi criada dentro da propriedade `data`
    - Exemplo de resposta:
    ```json
    "data": {
        "id": 6,
        "caseData": {
            "caseId": 1,
            "caseName": "Família"
        },
        "title": "Título",
        "description": "Descrição ",
        "profissionalNeeded": false,
        "user": {
            "id": 10,
            "firstName": "Seu",
            "lastName": "Nome",
            "email": "usuario999@email.com",
            "birth": "2023-07-23T00:00:00.000+00:00",
            "isProfessional": false,
            "actuationArea": null,
            "phoneNumer": "+55 (11) 12345-6789",
            "genderData": {
                "genderId": 2,
                "genderName": "Feminimo"
            },
            "oabcode": null
        },
        "createdAt": "2023-07-23T00:00:00.000+00:00",
        "solution": true
    }
    ```

### Soluçao
- DELETE /api/solution/DELETE/{postId}
    - Descrição: Remove a solução na publicação que contém o id do parâmetro `postId`
    - Parâmetros:
        - `postId`(Integer): id da publicação
    - Essa requisição não requer um corpo JSON
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/solution/DELETE/1", {
        method: "DELETE"
    })
    ```
    - Resposta: JSON com o código 204(NO CONTENT) indicando que a solução foi removida, incluindo somente o campo `message`
    - Exemplo de resposta:
    ```json
    {
        "message": "Solução removida com sucesso"
    }
    ```
- PUT /api/solution/PUT
    - Descrição: Adiciona a solução na publicação que contém o `postId` igual na requisição do body e destaca o comentário referenciado pelo `commentaryId`
    - Corpo JSON contendo os seguintes campos:
    ```json
    {
        "postId": 1,
        "commentaryId": 1
    }
    ```
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/solution/PUT", {
        method: "PUT",
        body: JSON.stringify({
            postId: 1,
            commentaryId: 1
        })
    })
    ```
    - Resposta: JSON com o código 200(OK) indicando que a solução foi destacada com sucesso, indicada pelo campo `message` na resposta
    - Exemplo de reposta:
    ```json
    {
        "message": "Marcado como solução com sucesso"
    }
    ```

### Edição de usuário
- PUT /api/editProfile
    - Descrição: Edita o perfil do usuário, contendo os campos `firstName`(nome) e `lastName`(sobrenome)
    - Corpo JSON contendo os seguintes campos:
        - `firstName`(String): Primeiro nome,
        - `lastName`(String): Sobrenone
    - Exemplo do corpo JSON
    ```json
    {
        "firstName": "Nome",
        "lastName": "Sobrenome"
    }
    ```
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("/api/editProfile", {
        method: "PUT",
        body: JSON.stringify({
            "firstName": "Nome",
            "lastName": "Sobrenome"
        })
    })
    ```
    - Resposta: JSON com o código 200(OK) indicando que o perfil foi editado com sucesso, indicado pelo campo `message` na resposta
    - Exemplo de resposta:
    ```json
    {
        "message": "Perfil atualizado com sucesso"
    }
    ```

## Registro
- POST /api/signup

    !!!note Os campos de `actuationArea` e `OABCode` se anulam automaticamente se o usuário se escolhar a opção de se registrar como regular
  
    - Descrição: Cria uma nova conta contendo os campos: `phoneNumber`, `email`, `password`, `gender`, `birth`, `actuationArea`, `OABCode` 
    - Corpo JSON contendo os seguintes campos:
        - `phoneNumber`(String): número de celular
        - `email`(String): e-mail
        - `password`(String): senha 
        - `gender`(Integer): gênero
        - `birth`(DATE AAAA-MM-DD): data de nascimento
        - `actuationArea`(String): area de atuação
        - `OABCode`(String): código OAB
    - Exemplo corpo JSON:
    ```json
    {
        "phoneNumber": "+55 (11) 12345-6789",
        "email": "usuario@exemplo.com",
        "password": "senhamuitoforte",
        "gender": 1,
        "birth": "2023-07-03",
        "actuationArea": "Família",
        "OABCode": "123456"
    }
    ```
    - Exemplo de requisição:
    ```javascript
    const response = await fetch("", {
        method: "POST",
        body: JSON.stringify({
            phoneNumber: "+55 (11) 12345-6789",
            email: "usuario@exemplo.com",
            password: "senhamuitoforte",
            gender: 1,
            birth: "2023-07-03",
            actuationArea: "Família",
            OABCode: "123456"
        })
    })
    ```
    - Resposta: JSON com o código 201(CREATED) com o campo `message` informado que a conta foi criada com sucesso
    - Exemplo de resposta:
    ```json
    {
        "message": "Conta criada com sucesso"
    }
    ```

### Login

!!!info Utilizamos a library [NextAuth](https://next-auth.js.org/) para manusear a autenticação/autorização

!!!warning Utilizamos a função [signIn](https://next-auth.js.org/getting-started/client#signin) em vez do fetch para chamar o endpoint de login e realizar a ação de login

- Exemplo de uso da função signIn:
    ```javascript
    // Após o envio de formulário
    const data = {email: "usuario@email.com", password: "senhamuitoforte"}

    // Primeiro argumento é o provedor, no caso estamos usando o provider
    signIn("credentials", { ...data, redirect: false }).then(
      ({ ok, error }) => {
        if (ok) {
          router.push("/");
        } else {
          setErrorState("Email ou senha estão incorretos");
          setLoading(false);
        }
      }
    );
    ```