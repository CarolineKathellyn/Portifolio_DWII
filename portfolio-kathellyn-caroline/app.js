const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsing de JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Favicon handler - evita erro 404
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Dados para as páginas
const estudante = {
    nome: 'Kathellyn Caroline Alves dos Santos',
    curso: 'Desenvolvimento de Software Multiplataforma',
    instituicao: 'FATEC Jessen Vidal - São José dos Campos',
    anoIngresso: 2024
};

const disciplinas = [
    'Design Digital',
    'Desenvolvimento Web 1',
    'Desenvolvimento Web 2',
    'Desenvolvimento Web 3',
    'Estrutura de Dados',
    'Matemática para Computação',
    'Algoritmos e Lógica de Programação',
    'Técnicas de Programação 1',
    'Técnicas de Programação 2',
    'Interação Humano Computador',
    'Álgebra Linear',
    'Estatística Aplicada',
    'Gestão Ágil de Projetos de Software',
    'Entrega Contínua',
    'Programação para Dispositivos Móveis 1',
    'Internet das Coisas',
    'Laboratório de Desenvolvimento Web',
    'Engenharia de Software 1',
    'Engenharia de Software 2',
    'Sistemas Operacionais e Redes de Computadores',
    'Modelagem de Banco de Dados',
    'Banco de Dados Relacional',
    'Banco de Dados Não Relacional'
];

const projetos = [
    {
        titulo: 'Sistema Gerenciador de Estoque - ProStock',
        descricao: 'Sistema de controle automatizado de estoque desenvolvido como projeto acadêmico interno com foco em automação e controle logístico. Oferece controle automatizado de produtos, movimentações em tempo real, cadastro e gestão de fornecedores.',
        tecnologias: ['Node.js', 'MySQL', 'React', 'Prisma ORM'],
        link: 'https://github.com/usuario/prostock'
    },
    {
        titulo: 'Sistema de Agricultura Indoor - GreenTECH',
        descricao: 'Aplicação web para monitoramento e controle de sistemas de agricultura indoor utilizando sensores IoT e Arduino para coleta de dados ambientais.',
        tecnologias: ['Python', 'Flask', 'HTML5', 'CSS3', 'Bootstrap', 'MySQL', 'AWS', 'Arduino', 'IoT Sensors'],
        link: 'https://github.com/FabioHiros/API-GreenTECH'
    },
    {
        titulo: 'ChatBot Assistente de Vendas ML',
        descricao: 'Assistente virtual para e-commerce baseado em modelos de linguagem (LLMs) e processamento de linguagem natural (NLP), capaz de entender necessidades dos usuários e recomendar produtos.',
        tecnologias: ['Python', 'Flask', 'LangChain', 'OpenAI API', 'MySQL', 'NLP'],
        link: 'https://github.com/usuario/chatbot-vendas'
    },
    {
        titulo: 'Sistema de Ponto Eletrônico - NectoPoint',
        descricao: 'Sistema completo de controle de ponto eletrônico com funcionalidades de controle automatizado, alertas em tempo real, gestão de jornadas flexíveis e relatórios analíticos.',
        tecnologias: ['Java', 'Spring Boot', 'React', 'TypeScript', 'AWS', 'MySQL', 'MongoDB'],
        link: 'https://github.com/Equipe-Skyfall/nectopoint-front'
    }
];

const contato = {
    email: 'kathellyn.carolineas@gmail.com',
    telefone: '12988054039',
    linkedin: 'kathellyn-caroline-a562101b9'
};

const tecnologias = ['Python', 'Java', 'JavaScript', 'Node.js', 'TypeScript', 'React Native', 'MySQL', 'MongoDB', 'Cassandra', 'Neo4j', 'Redis'];

const estatisticas = {
    totalDisciplinas: disciplinas.length,
    projetosConcluidos: projetos.length,
    tecnologiasUsadas: tecnologias
};

// Rotas
app.get('/', (req, res) => {
    res.render('index', { 
        nome: estudante.nome,
        titulo: 'Página Inicial'
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { 
        estudante: estudante,
        titulo: 'Sobre Mim'
    });
});

app.get('/disciplinas', (req, res) => {
    res.render('disciplinas', { 
        disciplinas: disciplinas,
        titulo: 'Minhas Disciplinas',
        total: disciplinas.length
    });
});

app.get('/projetos', (req, res) => {
    res.render('projetos', { 
        projetos: projetos,
        titulo: 'Meus Projetos'
    });
});

app.get('/contato', (req, res) => {
    res.render('contato', { 
        contato: contato,
        estatisticas: estatisticas,
        titulo: 'Contato'
    });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        estatisticas: estatisticas,
        disciplinas: disciplinas,
        projetos: projetos,
        tecnologias: tecnologias,
        titulo: 'Dashboard - Portfólio Kathellyn Caroline'
    });
});

// ============================================================
// ROTAS DA API REST - DISCIPLINAS
// ============================================================

// GET - Listar todas as disciplinas
app.get('/api/disciplinas', (req, res) => {
    res.json({
        success: true,
        total: disciplinas.length,
        data: disciplinas
    });
});

// GET - Buscar disciplina específica por índice
app.get('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= disciplinas.length) {
        return res.status(404).json({
            success: false,
            message: 'Disciplina não encontrada'
        });
    }

    res.json({
        success: true,
        data: disciplinas[id]
    });
});

// POST - Adicionar nova disciplina
app.post('/api/disciplinas', (req, res) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da disciplina é obrigatório'
        });
    }

    // Verifica se já existe
    if (disciplinas.includes(nome)) {
        return res.status(409).json({
            success: false,
            message: 'Disciplina já cadastrada'
        });
    }

    disciplinas.push(nome);

    res.status(201).json({
        success: true,
        message: 'Disciplina adicionada com sucesso',
        data: {
            id: disciplinas.length - 1,
            nome: nome
        }
    });
});

// PUT - Atualizar disciplina existente
app.put('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    if (id < 0 || id >= disciplinas.length) {
        return res.status(404).json({
            success: false,
            message: 'Disciplina não encontrada'
        });
    }

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da disciplina é obrigatório'
        });
    }

    const nomeAntigo = disciplinas[id];
    disciplinas[id] = nome;

    res.json({
        success: true,
        message: 'Disciplina atualizada com sucesso',
        data: {
            id: id,
            nomeAntigo: nomeAntigo,
            nomeNovo: nome
        }
    });
});

// DELETE - Remover disciplina
app.delete('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= disciplinas.length) {
        return res.status(404).json({
            success: false,
            message: 'Disciplina não encontrada'
        });
    }

    const disciplinaRemovida = disciplinas.splice(id, 1)[0];

    res.json({
        success: true,
        message: 'Disciplina removida com sucesso',
        data: disciplinaRemovida
    });
});

// ============================================================
// ROTAS DA API REST - PROJETOS
// ============================================================

// GET - Listar todos os projetos
app.get('/api/projetos', (req, res) => {
    res.json({
        success: true,
        total: projetos.length,
        data: projetos
    });
});

// GET - Buscar projeto específico por índice
app.get('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= projetos.length) {
        return res.status(404).json({
            success: false,
            message: 'Projeto não encontrado'
        });
    }

    res.json({
        success: true,
        data: projetos[id]
    });
});

// POST - Adicionar novo projeto
app.post('/api/projetos', (req, res) => {
    const { titulo, descricao, tecnologias, link } = req.body;

    // Validações
    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Título do projeto é obrigatório'
        });
    }

    if (!descricao || descricao.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Descrição do projeto é obrigatória'
        });
    }

    if (!tecnologias || !Array.isArray(tecnologias) || tecnologias.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Tecnologias devem ser um array com ao menos um item'
        });
    }

    const novoProjeto = {
        titulo,
        descricao,
        tecnologias,
        link: link || '#'
    };

    projetos.push(novoProjeto);

    res.status(201).json({
        success: true,
        message: 'Projeto adicionado com sucesso',
        data: {
            id: projetos.length - 1,
            ...novoProjeto
        }
    });
});

// PUT - Atualizar projeto existente
app.put('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descricao, tecnologias, link } = req.body;

    if (id < 0 || id >= projetos.length) {
        return res.status(404).json({
            success: false,
            message: 'Projeto não encontrado'
        });
    }

    // Atualiza apenas os campos fornecidos
    if (titulo) projetos[id].titulo = titulo;
    if (descricao) projetos[id].descricao = descricao;
    if (tecnologias && Array.isArray(tecnologias)) projetos[id].tecnologias = tecnologias;
    if (link) projetos[id].link = link;

    res.json({
        success: true,
        message: 'Projeto atualizado com sucesso',
        data: {
            id: id,
            ...projetos[id]
        }
    });
});

// DELETE - Remover projeto
app.delete('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= projetos.length) {
        return res.status(404).json({
            success: false,
            message: 'Projeto não encontrado'
        });
    }

    const projetoRemovido = projetos.splice(id, 1)[0];

    res.json({
        success: true,
        message: 'Projeto removido com sucesso',
        data: projetoRemovido
    });
});

// ============================================================
// ROTAS DA API REST - TECNOLOGIAS
// ============================================================

// GET - Listar todas as tecnologias
app.get('/api/tecnologias', (req, res) => {
    res.json({
        success: true,
        total: tecnologias.length,
        data: tecnologias
    });
});

// GET - Buscar tecnologia específica por índice
app.get('/api/tecnologias/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= tecnologias.length) {
        return res.status(404).json({
            success: false,
            message: 'Tecnologia não encontrada'
        });
    }

    res.json({
        success: true,
        data: tecnologias[id]
    });
});

// POST - Adicionar nova tecnologia
app.post('/api/tecnologias', (req, res) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da tecnologia é obrigatório'
        });
    }

    // Verifica se já existe
    if (tecnologias.includes(nome)) {
        return res.status(409).json({
            success: false,
            message: 'Tecnologia já cadastrada'
        });
    }

    tecnologias.push(nome);

    res.status(201).json({
        success: true,
        message: 'Tecnologia adicionada com sucesso',
        data: {
            id: tecnologias.length - 1,
            nome: nome
        }
    });
});

// PUT - Atualizar tecnologia existente
app.put('/api/tecnologias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    if (id < 0 || id >= tecnologias.length) {
        return res.status(404).json({
            success: false,
            message: 'Tecnologia não encontrada'
        });
    }

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da tecnologia é obrigatório'
        });
    }

    const nomeAntigo = tecnologias[id];
    tecnologias[id] = nome;

    res.json({
        success: true,
        message: 'Tecnologia atualizada com sucesso',
        data: {
            id: id,
            nomeAntigo: nomeAntigo,
            nomeNovo: nome
        }
    });
});

// DELETE - Remover tecnologia
app.delete('/api/tecnologias/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= tecnologias.length) {
        return res.status(404).json({
            success: false,
            message: 'Tecnologia não encontrada'
        });
    }

    const tecnologiaRemovida = tecnologias.splice(id, 1)[0];

    res.json({
        success: true,
        message: 'Tecnologia removida com sucesso',
        data: tecnologiaRemovida
    });
});

// ============================================================
// ROTAS DA API REST - INFORMAÇÕES GERAIS
// ============================================================

// GET - Estatísticas gerais
app.get('/api/estatisticas', (req, res) => {
    res.json({
        success: true,
        data: {
            totalDisciplinas: disciplinas.length,
            totalProjetos: projetos.length,
            totalTecnologias: tecnologias.length,
            estudante: estudante
        }
    });
});

// GET - Informações do estudante
app.get('/api/estudante', (req, res) => {
    res.json({
        success: true,
        data: estudante
    });
});

// PUT - Atualizar informações do estudante
app.put('/api/estudante', (req, res) => {
    const { nome, curso, instituicao, anoIngresso } = req.body;

    if (nome) estudante.nome = nome;
    if (curso) estudante.curso = curso;
    if (instituicao) estudante.instituicao = instituicao;
    if (anoIngresso) estudante.anoIngresso = anoIngresso;

    res.json({
        success: true,
        message: 'Informações do estudante atualizadas com sucesso',
        data: estudante
    });
});

// GET - Informações de contato
app.get('/api/contato', (req, res) => {
    res.json({
        success: true,
        data: contato
    });
});

// PUT - Atualizar informações de contato
app.put('/api/contato', (req, res) => {
    const { email, telefone, linkedin } = req.body;

    if (email) contato.email = email;
    if (telefone) contato.telefone = telefone;
    if (linkedin) contato.linkedin = linkedin;

    res.json({
        success: true,
        message: 'Informações de contato atualizadas com sucesso',
        data: contato
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});