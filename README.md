# inicie_front

Este é um projeto Angular chamado inicie_front com suporte a Docker.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina local antes de prosseguir:

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

## Executando o Projeto com Docker

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/inicie_front.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd inicie_front
    ```

3. Construa a imagem Docker:

    ```bash
    docker build -t inicie_front .
    ```

4. Execute o contêiner Docker:

    ```bash
    docker run -d -p 4200:80 inicie_front
    ```

5. Acesse o aplicativo em seu navegador:

    ```bash
    Abra seu navegador e visite http://localhost:4200
    ```

6. Para parar o contêiner Docker, execute:

    ```bash
    docker stop $(docker ps -a -q --filter ancestor=inicie_front --format="{{.ID}}")
    ```

## Caso queira rodar o projeto diretamente:

Para construir o projeto execute os comando abaixo:

    ```bash
    npm install
    ng serve
    ```
