# Portfólio - Integração com MySQL e Sequelize

Este projeto agora está totalmente integrado com MySQL usando Sequelize ORM.

## Pré-requisitos

- Node.js (>= 16.0.0)
- MySQL Server (>= 5.7 ou >= 8.0)
- npm ou yarn

## Configuração do Banco de Dados

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Edite o arquivo `.env` na raiz do projeto com suas credenciais MySQL:

```env
# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portfolio_db
DB_USER=root
DB_PASSWORD=sua_senha_aqui

# Configuração do Servidor
PORT=3001
NODE_ENV=development
```

### 3. Criar o banco de dados no MySQL

Conecte-se ao MySQL e crie o banco de dados:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 4. Sincronizar tabelas e popular com dados

Execute o comando de setup completo (cria tabelas e insere dados iniciais):

```bash
npm run db:setup
```

Ou execute cada etapa separadamente:

```bash
# Apenas criar as tabelas
npm run db:sync

# Apenas popular com dados
npm run db:seed
```

### 5. Iniciar o servidor

```bash
npm start
```

ou em modo de desenvolvimento:

```bash
npm run dev
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor em modo produção |
| `npm run dev` | Inicia o servidor com nodemon (reinicia automaticamente) |
| `npm run db:sync` | Sincroniza os models com o banco (cria tabelas) |
| `npm run db:seed` | Popula o banco com dados iniciais |
| `npm run db:reset` | APAGA todas as tabelas e recria vazias (CUIDADO!) |
| `npm run db:setup` | Executa sync + seed (configuração completa) |

## Estrutura do Banco de Dados

### Tabelas Criadas

1. **estudantes**
   - id (PK)
   - nome
   - curso
   - instituicao
   - ano_ingresso
   - created_at, updated_at

2. **disciplinas**
   - id (PK)
   - nome (unique)
   - semestre
   - carga_horaria
   - ativa (boolean)
   - created_at, updated_at

3. **tecnologias**
   - id (PK)
   - nome (unique)
   - categoria (enum)
   - nivel_conhecimento (enum)
   - created_at, updated_at

4. **projetos**
   - id (PK)
   - titulo
   - descricao
   - link
   - data_inicio, data_fim
   - status (enum)
   - destaque (boolean)
   - created_at, updated_at

5. **contatos**
   - id (PK)
   - email (unique)
   - telefone
   - linkedin
   - github
   - site_pessoal
   - cidade, estado
   - principal (boolean)
   - created_at, updated_at

6. **projeto_tecnologias** (tabela de junção)
   - projeto_id (FK)
   - tecnologia_id (FK)
   - created_at, updated_at

### Relacionamentos

- **Projetos** N:N **Tecnologias** (muitos-para-muitos)
  - Um projeto pode usar várias tecnologias
  - Uma tecnologia pode estar em vários projetos

## API REST

Todas as rotas da API estão disponíveis em `/api`:

### Disciplinas
- `GET /api/disciplinas` - Listar todas
- `GET /api/disciplinas/:id` - Buscar por ID
- `POST /api/disciplinas` - Criar nova
- `PUT /api/disciplinas/:id` - Atualizar
- `DELETE /api/disciplinas/:id` - Remover

### Projetos
- `GET /api/projetos` - Listar todos (com tecnologias)
- `GET /api/projetos/:id` - Buscar por ID (com tecnologias)
- `POST /api/projetos` - Criar novo
- `PUT /api/projetos/:id` - Atualizar
- `DELETE /api/projetos/:id` - Remover

### Tecnologias
- `GET /api/tecnologias` - Listar todas
- `GET /api/tecnologias/:id` - Buscar por ID
- `POST /api/tecnologias` - Criar nova
- `PUT /api/tecnologias/:id` - Atualizar
- `DELETE /api/tecnologias/:id` - Remover

### Informações Gerais
- `GET /api/estatisticas` - Estatísticas gerais
- `GET /api/estudante` - Informações do estudante
- `PUT /api/estudante` - Atualizar estudante
- `GET /api/contato` - Informações de contato
- `PUT /api/contato` - Atualizar contato

## Exemplo de Requisições

### Criar uma nova disciplina

```bash
curl -X POST http://localhost:3001/api/disciplinas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Segurança da Informação", "semestre": 3, "carga_horaria": 80}'
```

### Criar um novo projeto com tecnologias

```bash
curl -X POST http://localhost:3001/api/projetos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Meu Novo Projeto",
    "descricao": "Descrição do projeto",
    "link": "https://github.com/user/projeto",
    "status": "em_desenvolvimento",
    "destaque": true,
    "tecnologias": [1, 2, 3]
  }'
```

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para Node.js
- **MySQL2** - Driver MySQL para Node.js
- **EJS** - Template engine
- **dotenv** - Gerenciamento de variáveis de ambiente

## Estrutura de Pastas

```
portfolio-kathellyn-caroline/
├── config/
│   └── database.js          # Configurações do Sequelize
├── models/
│   ├── index.js             # Inicialização do Sequelize
│   ├── Estudante.js         # Model Estudante
│   ├── Disciplina.js        # Model Disciplina
│   ├── Tecnologia.js        # Model Tecnologia
│   ├── Projeto.js           # Model Projeto
│   └── Contato.js           # Model Contato
├── routes/
│   └── api.js               # Rotas da API REST
├── seeders/
│   └── seed.js              # Dados iniciais
├── scripts/
│   ├── db-sync.js           # Script de sincronização
│   └── db-reset.js          # Script de reset
├── views/                   # Templates EJS
├── public/                  # Arquivos estáticos
├── .env                     # Variáveis de ambiente (não versionar!)
├── .env.example             # Exemplo de .env
├── app.js                   # Arquivo principal
└── package.json             # Dependências e scripts
```

## Solução de Problemas

### Erro: "ER_BAD_DB_ERROR: Unknown database"
O banco de dados não existe. Crie-o com:
```sql
CREATE DATABASE portfolio_db;
```

### Erro: "Access denied for user"
Verifique as credenciais no arquivo `.env`:
- DB_USER
- DB_PASSWORD
- DB_HOST

### Erro: "connect ECONNREFUSED"
O MySQL não está rodando. Inicie o serviço:
- Windows: `net start mysql`
- Linux/Mac: `sudo service mysql start` ou `brew services start mysql`

### Tabelas não aparecem
Execute:
```bash
npm run db:sync
```

### Dados não aparecem
Execute:
```bash
npm run db:seed
```

## Autor

**Kathellyn Caroline Alves dos Santos**
- Email: kathellyn.carolineas@gmail.com
- LinkedIn: [kathellyn-caroline-a562101b9](https://linkedin.com/in/kathellyn-caroline-a562101b9)
- Instituição: FATEC Jessen Vidal - São José dos Campos
- Curso: Desenvolvimento de Software Multiplataforma

## Licença

MIT
