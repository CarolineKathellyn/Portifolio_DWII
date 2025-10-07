const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Configuração de CORS
app.use(cors({
    origin: '*', // Permite todas as origens - ajuste conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

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

// ============================================
// ROTAS DA API REST
// ============================================

// --- DISCIPLINAS ---
app.get('/api/disciplinas', (req, res) => {
    res.json({
        success: true,
        total: disciplinas.length,
        data: disciplinas
    });
});

app.get('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < disciplinas.length) {
        res.json({
            success: true,
            data: disciplinas[id]
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Disciplina não encontrada'
        });
    }
});

app.post('/api/disciplinas', (req, res) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da disciplina é obrigatório'
        });
    }

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

app.put('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da disciplina é obrigatório'
        });
    }

    if (id >= 0 && id < disciplinas.length) {
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
    } else {
        res.status(404).json({
            success: false,
            message: 'Disciplina não encontrada'
        });
    }
});

app.delete('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < disciplinas.length) {
        const removida = disciplinas.splice(id, 1)[0];
        res.json({
            success: true,
            message: 'Disciplina removida com sucesso',
            data: removida
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Disciplina não encontrada'
        });
    }
});

// --- PROJETOS ---
app.get('/api/projetos', (req, res) => {
    res.json({
        success: true,
        total: projetos.length,
        data: projetos
    });
});

app.get('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < projetos.length) {
        res.json({
            success: true,
            data: projetos[id]
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Projeto não encontrado'
        });
    }
});

app.post('/api/projetos', (req, res) => {
    const { titulo, descricao, tecnologias, link } = req.body;

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
            message: 'Tecnologias são obrigatórias'
        });
    }

    const novoProjeto = {
        titulo,
        descricao,
        tecnologias,
        link: link || ''
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

app.put('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descricao, tecnologias, link } = req.body;

    if (id >= 0 && id < projetos.length) {
        if (titulo) projetos[id].titulo = titulo;
        if (descricao) projetos[id].descricao = descricao;
        if (tecnologias) projetos[id].tecnologias = tecnologias;
        if (link !== undefined) projetos[id].link = link;

        res.json({
            success: true,
            message: 'Projeto atualizado com sucesso',
            data: {
                id: id,
                ...projetos[id]
            }
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Projeto não encontrado'
        });
    }
});

app.delete('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < projetos.length) {
        const removido = projetos.splice(id, 1)[0];
        res.json({
            success: true,
            message: 'Projeto removido com sucesso',
            data: removido
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Projeto não encontrado'
        });
    }
});

// --- TECNOLOGIAS ---
app.get('/api/tecnologias', (req, res) => {
    res.json({
        success: true,
        total: tecnologias.length,
        data: tecnologias
    });
});

app.get('/api/tecnologias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < tecnologias.length) {
        res.json({
            success: true,
            data: tecnologias[id]
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Tecnologia não encontrada'
        });
    }
});

app.post('/api/tecnologias', (req, res) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da tecnologia é obrigatório'
        });
    }

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

app.put('/api/tecnologias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Nome da tecnologia é obrigatório'
        });
    }

    if (id >= 0 && id < tecnologias.length) {
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
    } else {
        res.status(404).json({
            success: false,
            message: 'Tecnologia não encontrada'
        });
    }
});

app.delete('/api/tecnologias/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < tecnologias.length) {
        const removida = tecnologias.splice(id, 1)[0];
        res.json({
            success: true,
            message: 'Tecnologia removida com sucesso',
            data: removida
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Tecnologia não encontrada'
        });
    }
});

// --- ESTATÍSTICAS ---
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

// --- ESTUDANTE ---
app.get('/api/estudante', (req, res) => {
    res.json({
        success: true,
        data: estudante
    });
});

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

// --- CONTATO ---
app.get('/api/contato', (req, res) => {
    res.json({
        success: true,
        data: contato
    });
});

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

module.exports = app;
