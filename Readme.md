<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Gympoint - Sistema de gerenciamento de academias
</h3>

## Como instalar

Use [git](https://github.com/lpbborges/gympoint/) clone  para clonar o Gympoint.

```bash
git clone https://github.com/lpbborges/gympoint.git
```

<p>Copie o arquivo .env.example com o nome .env para inofrmar as suas variáveis de ambiente</p>

```bash
cp .env.example .env
```

## Como executar

## Back-end
```bash
yarn sequelize db:migrate
yarn sequelize db:seed:all

yarn && yarn dev && yarn queue
```

## Front-end

```bash
yarn start
```

## Mobile

<small>App desenvolvido para dispositivos Android</small>

```bash
react-native start && react-native run-android
```
## Tecnologias utilizadas
[Node.js](https://nodejs.org/en/)<br>
[React](https://pt-br.reactjs.org/)<br>
[React Native](https://facebook.github.io/react-native/)<br>
[Styled Components](https://styled-components.com/)<br>
[PostgreSQL](https://www.postgresql.org/)<br>
[Redis](https://redis.io/)<br>
[Docker](https://www.docker.com/)<br>
[Sentry](https://sentry.io/welcome/)<br>
[Mailtrap](https://mailtrap.io/)<br>
[Bee-Queue](https://github.com/bee-queue/bee-queue)<br>
[Redux](https://redux.js.org/)<br>
[Redux-Saga](https://redux-saga.js.org/)<br>
[Reactotron](https://github.com/infinitered/reactotron)<br>
[Yup](https://github.com/jquense/yup)<br>


## Licença
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.