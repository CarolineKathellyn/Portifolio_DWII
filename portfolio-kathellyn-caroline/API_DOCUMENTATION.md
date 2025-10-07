# Documentação da API REST - Portfólio Kathellyn Caroline

Esta API REST fornece endpoints para gerenciar informações do portfólio acadêmico.

## Base URL
```
http://localhost:3000/api
```

## Formato de Resposta
Todas as respostas seguem o padrão:
```json
{
  "success": true/false,
  "message": "Mensagem descritiva (quando aplicável)",
  "data": {...} // Dados retornados
}
```

---

## DISCIPLINAS

### GET /api/disciplinas
Lista todas as disciplinas cadastradas.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "total": 23,
  "data": [
    "Design Digital",
    "Desenvolvimento Web 1",
    ...
  ]
}
```

### GET /api/disciplinas/:id
Busca uma disciplina específica por índice.

**Parâmetros:**
- `id` (number) - Índice da disciplina

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": "Desenvolvimento Web 2"
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Disciplina não encontrada"
}
```

### POST /api/disciplinas
Adiciona uma nova disciplina.

**Body (JSON):**
```json
{
  "nome": "Nova Disciplina"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Disciplina adicionada com sucesso",
  "data": {
    "id": 23,
    "nome": "Nova Disciplina"
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Nome da disciplina é obrigatório"
}
```

**Resposta de Erro (409):**
```json
{
  "success": false,
  "message": "Disciplina já cadastrada"
}
```

### PUT /api/disciplinas/:id
Atualiza uma disciplina existente.

**Parâmetros:**
- `id` (number) - Índice da disciplina

**Body (JSON):**
```json
{
  "nome": "Disciplina Atualizada"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Disciplina atualizada com sucesso",
  "data": {
    "id": 5,
    "nomeAntigo": "Nome Antigo",
    "nomeNovo": "Disciplina Atualizada"
  }
}
```

### DELETE /api/disciplinas/:id
Remove uma disciplina.

**Parâmetros:**
- `id` (number) - Índice da disciplina

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Disciplina removida com sucesso",
  "data": "Nome da Disciplina Removida"
}
```

---

## PROJETOS

### GET /api/projetos
Lista todos os projetos cadastrados.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "total": 4,
  "data": [
    {
      "titulo": "Sistema Gerenciador de Estoque - ProStock",
      "descricao": "Sistema de controle automatizado...",
      "tecnologias": ["Node.js", "MySQL", "React"],
      "link": "https://github.com/..."
    }
  ]
}
```

### GET /api/projetos/:id
Busca um projeto específico por índice.

**Parâmetros:**
- `id` (number) - Índice do projeto

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "titulo": "Sistema Gerenciador de Estoque - ProStock",
    "descricao": "Sistema de controle automatizado...",
    "tecnologias": ["Node.js", "MySQL", "React"],
    "link": "https://github.com/..."
  }
}
```

### POST /api/projetos
Adiciona um novo projeto.

**Body (JSON):**
```json
{
  "titulo": "Novo Projeto",
  "descricao": "Descrição do projeto",
  "tecnologias": ["JavaScript", "Node.js"],
  "link": "https://github.com/projeto" // opcional
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Projeto adicionado com sucesso",
  "data": {
    "id": 4,
    "titulo": "Novo Projeto",
    "descricao": "Descrição do projeto",
    "tecnologias": ["JavaScript", "Node.js"],
    "link": "https://github.com/projeto"
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Título do projeto é obrigatório"
}
```

### PUT /api/projetos/:id
Atualiza um projeto existente (atualização parcial).

**Parâmetros:**
- `id` (number) - Índice do projeto

**Body (JSON) - Todos os campos são opcionais:**
```json
{
  "titulo": "Título Atualizado",
  "descricao": "Nova descrição",
  "tecnologias": ["React", "TypeScript"],
  "link": "https://novo-link.com"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Projeto atualizado com sucesso",
  "data": {
    "id": 2,
    "titulo": "Título Atualizado",
    "descricao": "Nova descrição",
    "tecnologias": ["React", "TypeScript"],
    "link": "https://novo-link.com"
  }
}
```

### DELETE /api/projetos/:id
Remove um projeto.

**Parâmetros:**
- `id` (number) - Índice do projeto

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Projeto removido com sucesso",
  "data": {
    "titulo": "Projeto Removido",
    ...
  }
}
```

---

## TECNOLOGIAS

### GET /api/tecnologias
Lista todas as tecnologias cadastradas.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "total": 11,
  "data": ["Python", "Java", "JavaScript", ...]
}
```

### GET /api/tecnologias/:id
Busca uma tecnologia específica por índice.

### POST /api/tecnologias
Adiciona uma nova tecnologia.

**Body (JSON):**
```json
{
  "nome": "Docker"
}
```

### PUT /api/tecnologias/:id
Atualiza uma tecnologia existente.

### DELETE /api/tecnologias/:id
Remove uma tecnologia.

> As rotas de tecnologias seguem o mesmo padrão das disciplinas.

---

## ESTATÍSTICAS

### GET /api/estatisticas
Retorna estatísticas gerais do portfólio.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "totalDisciplinas": 23,
    "totalProjetos": 4,
    "totalTecnologias": 11,
    "estudante": {
      "nome": "Kathellyn Caroline Alves dos Santos",
      "curso": "Desenvolvimento de Software Multiplataforma",
      "instituicao": "FATEC Jessen Vidal - São José dos Campos",
      "anoIngresso": 2024
    }
  }
}
```

---

## ESTUDANTE

### GET /api/estudante
Retorna informações do estudante.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "nome": "Kathellyn Caroline Alves dos Santos",
    "curso": "Desenvolvimento de Software Multiplataforma",
    "instituicao": "FATEC Jessen Vidal - São José dos Campos",
    "anoIngresso": 2024
  }
}
```

### PUT /api/estudante
Atualiza informações do estudante (atualização parcial).

**Body (JSON) - Todos os campos são opcionais:**
```json
{
  "nome": "Novo Nome",
  "curso": "Novo Curso",
  "instituicao": "Nova Instituição",
  "anoIngresso": 2025
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Informações do estudante atualizadas com sucesso",
  "data": {
    "nome": "Novo Nome",
    ...
  }
}
```

---

## CONTATO

### GET /api/contato
Retorna informações de contato.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "email": "kathellyn.carolineas@gmail.com",
    "telefone": "12988054039",
    "linkedin": "kathellyn-caroline-a562101b9"
  }
}
```

### PUT /api/contato
Atualiza informações de contato (atualização parcial).

**Body (JSON) - Todos os campos são opcionais:**
```json
{
  "email": "novo@email.com",
  "telefone": "11999999999",
  "linkedin": "novo-linkedin"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Informações de contato atualizadas com sucesso",
  "data": {
    "email": "novo@email.com",
    ...
  }
}
```

---

## Códigos de Status HTTP

- **200 OK** - Requisição bem-sucedida
- **201 Created** - Recurso criado com sucesso
- **400 Bad Request** - Dados inválidos ou faltando
- **404 Not Found** - Recurso não encontrado
- **409 Conflict** - Recurso já existe (duplicado)

---

## Testando a API

### Usando curl:

```bash
# Listar disciplinas
curl http://localhost:3000/api/disciplinas

# Adicionar disciplina
curl -X POST http://localhost:3000/api/disciplinas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Inteligência Artificial"}'

# Atualizar disciplina
curl -X PUT http://localhost:3000/api/disciplinas/0 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Design Digital Avançado"}'

# Deletar disciplina
curl -X DELETE http://localhost:3000/api/disciplinas/0

# Adicionar projeto
curl -X POST http://localhost:3000/api/projetos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo":"Meu Novo Projeto",
    "descricao":"Descrição detalhada",
    "tecnologias":["JavaScript","React"],
    "link":"https://github.com/usuario/projeto"
  }'
```

### Usando ferramentas:
- **Postman** - https://www.postman.com/
- **Insomnia** - https://insomnia.rest/
- **Thunder Client** (extensão VS Code)

---

## Observações Importantes

1. **Persistência de Dados**: Os dados são armazenados em memória. Ao reiniciar o servidor, todas as alterações serão perdidas.

2. **IDs**: Os IDs são baseados no índice do array (começando em 0). Ao deletar um item, os índices são reorganizados.

3. **Validações**: Todas as rotas POST e PUT possuem validações básicas de campos obrigatórios.

4. **CORS**: Se precisar acessar a API de outro domínio, adicione o middleware `cors` ao projeto.
