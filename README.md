![GoStack Bootcamp][logo]

### Level 02 - Desafio: Database upload

[📑 Instruções do desafio][challenge]

---

### 📝 Instruções

1. Criar um *Docker container* com a imagem do **PostgreSQL**:

    ```bash
    docker run --name gostack_desafio06 -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```

2. Criar os seguintes *databases* no **PostgreSQL**:

    - *development*: `gostack_desafio06`
    - *test*: `gostack_desafio06_tests`

3. Verificar se a extensão `uuid-ossp` está ativa para os *databases*.

4. Criar as *migrations* do **TypeORM**

    ```bash
    yarn typeorm migration:create -n CreateTransactions
    yarn typeorm migration:create -n CreateCategories
    yarn typeorm migration:create -n TransactionCategoryFK
    ```

---

### ⚙ Testes

- [x] - `should be able to create a new transaction`: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

- [x] - `should create tags when inserting new transactions`: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que não existe, essa seja criada e inserida no campo category_id da transação com o id que acabou de ser criado.

- [x] - `should not create tags when they already exists`: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que já existe, seja atribuído ao campo category_id da transação com o id dessa categoria existente, não permitindo a criação de categorias com o mesmo title.

- [x] - `should be able to list the transactions`: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array de objetos contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- [x] - `should not be able to create outcome transaction without a valid balance`: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo outcome extrapole o valor total que o usuário tem em caixa (total de income), retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`.

- [x] - `should be able to delete a transaction`: Para que esse teste passe, você deve permitir que a sua rota de delete exclua uma transação, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204.

- [x] - `should be able to import transactions`: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte modelo. Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.

---

### Referências

- [Docker](https://www.docker.com/get-started)
- [TypeORM Migrations](https://typeorm.io/#/migrations)

[logo]: https://github.com/leonardosposina/gostack13-lv01-d01/blob/master/docs/gostack-bootcamp.png?raw=true
[challenge]: https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-database-upload
