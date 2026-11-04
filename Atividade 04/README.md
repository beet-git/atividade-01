# Atividade 04 — Autenticação JWT + cookie httpOnly (NestJS)

Parte de `aula_23-10` (backend-inicial + frontend prontos) e implementa o roteiro
"Aula 07 (23-10): JWT e Segurança de APIs". A pasta `backend-inicial` virou `backend-final`.

## O que foi feito no backend-final
- `src/users/` — entidade `User` (tabela `usuarios`), `UsersService`, `UsersModule`
- `src/auth/` — `AuthService` (bcrypt + JWT com `sub`), `AuthDto`, `JwtStrategy` (lê o cookie
  `access_token`), `JwtAuthGuard`, `AuthController` (`register`, `login`, `logout`, `me`), `AuthModule`
- `src/migrations/1791591300000-CreateUsers.ts` — cria a tabela `usuarios`
- `data-source.ts` — entidade `User` adicionada
- `app.module.ts` — `UsersModule` e `AuthModule` importados
- `main.ts` — `app.use(cookieParser())`
- `tarefas.controller.ts` — `@UseGuards(JwtAuthGuard)` (todas as rotas protegidas) e `remove` agora usa `await`
- `package.json` — dependências de JWT/passport/bcryptjs/cookie-parser

## Como rodar
```bash
docker compose up -d --build        # frontend (5173) + Postgres (5432)
cd backend-final
npm install
npm run migration:run               # cria tarefas e usuarios
npm run start:dev                   # API em http://localhost:3000/api
```
Abra http://localhost:5173 — sem sessão cai em /login. Cadastre-se, crie/edite/exclua tarefas e clique em Sair.

## Teste via curl (cookie jar)
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"email":"aluno@uncisal.edu.br","senha":"123456"}'
curl -c cookies.txt -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"aluno@uncisal.edu.br","senha":"123456"}'
curl -b cookies.txt http://localhost:3000/api/auth/me
curl -b cookies.txt http://localhost:3000/api/tarefas
curl http://localhost:3000/api/tarefas        # 401 sem cookie
```
