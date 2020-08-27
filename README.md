# Rocketseat

## Bootcamp GoStack #13

### Level 02 - Desafio: Database upload

- [Instruções do Desafio](https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-database-upload)

---

### Preparando o ambiente

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

### Referências

- [Docker](https://www.docker.com/get-started)
- [TypeORM Migrations](https://typeorm.io/#/migrations)
