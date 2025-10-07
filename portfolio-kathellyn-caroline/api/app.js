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

module.exports = app;
