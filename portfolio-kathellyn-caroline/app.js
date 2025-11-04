require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize, Estudante, Disciplina, Projeto, Tecnologia, Contato } = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Usar rotas da API
app.use('/api', apiRoutes);

// Dados estáticos removidos - agora todos os dados vêm do banco de dados MySQL via Sequelize

// Rotas de visualização (usando banco de dados)
app.get('/', async (req, res) => {
    try {
        const estudante = await Estudante.findOne();
        res.render('index', {
            nome: estudante ? estudante.nome : 'Estudante',
            titulo: 'Página Inicial'
        });
    } catch (error) {
        console.error('Erro ao buscar estudante:', error);
        res.render('index', {
            nome: 'Estudante',
            titulo: 'Página Inicial'
        });
    }
});

app.get('/sobre', async (req, res) => {
    try {
        const estudante = await Estudante.findOne();
        res.render('sobre', {
            estudante: estudante || {},
            titulo: 'Sobre Mim'
        });
    } catch (error) {
        console.error('Erro ao buscar estudante:', error);
        res.render('sobre', {
            estudante: {},
            titulo: 'Sobre Mim'
        });
    }
});

app.get('/disciplinas', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({
            order: [['nome', 'ASC']]
        });
        res.render('disciplinas', {
            disciplinas: disciplinas.map(d => d.nome),
            titulo: 'Minhas Disciplinas',
            total: disciplinas.length
        });
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        res.render('disciplinas', {
            disciplinas: [],
            titulo: 'Minhas Disciplinas',
            total: 0
        });
    }
});

app.get('/projetos', async (req, res) => {
    try {
        const projetos = await Projeto.findAll({
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }],
            order: [['destaque', 'DESC'], ['created_at', 'DESC']]
        });

        // Formatar projetos para o formato esperado pela view
        const projetosFormatados = projetos.map(p => ({
            titulo: p.titulo,
            descricao: p.descricao,
            tecnologias: p.tecnologias.map(t => t.nome),
            link: p.link
        }));

        res.render('projetos', {
            projetos: projetosFormatados,
            titulo: 'Meus Projetos'
        });
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.render('projetos', {
            projetos: [],
            titulo: 'Meus Projetos'
        });
    }
});

app.get('/contato', async (req, res) => {
    try {
        const contato = await Contato.findOne({ where: { principal: true } });
        const totalDisciplinas = await Disciplina.count();
        const totalProjetos = await Projeto.count();
        const tecnologias = await Tecnologia.findAll();

        const contatoData = contato ? {
            email: contato.email,
            telefone: contato.telefone,
            linkedin: contato.linkedin
        } : {};

        const estatisticas = {
            totalDisciplinas,
            projetosConcluidos: totalProjetos,
            tecnologiasUsadas: tecnologias.map(t => t.nome)
        };

        res.render('contato', {
            contato: contatoData,
            estatisticas: estatisticas,
            titulo: 'Contato'
        });
    } catch (error) {
        console.error('Erro ao buscar contato:', error);
        res.render('contato', {
            contato: {},
            estatisticas: { totalDisciplinas: 0, projetosConcluidos: 0, tecnologiasUsadas: [] },
            titulo: 'Contato'
        });
    }
});

app.get('/dashboard', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({ order: [['nome', 'ASC']] });
        const projetos = await Projeto.findAll({
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }],
            order: [['destaque', 'DESC'], ['created_at', 'DESC']]
        });
        const tecnologias = await Tecnologia.findAll({ order: [['nome', 'ASC']] });

        const estatisticas = {
            totalDisciplinas: disciplinas.length,
            projetosConcluidos: projetos.length,
            tecnologiasUsadas: tecnologias.map(t => t.nome)
        };

        const projetosFormatados = projetos.map(p => ({
            titulo: p.titulo,
            descricao: p.descricao,
            tecnologias: p.tecnologias.map(t => t.nome),
            link: p.link
        }));

        res.render('dashboard', {
            estatisticas: estatisticas,
            disciplinas: disciplinas.map(d => d.nome),
            projetos: projetosFormatados,
            tecnologias: tecnologias.map(t => t.nome),
            titulo: 'Dashboard - Portfólio Kathellyn Caroline'
        });
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        res.render('dashboard', {
            estatisticas: { totalDisciplinas: 0, projetosConcluidos: 0, tecnologiasUsadas: [] },
            disciplinas: [],
            projetos: [],
            tecnologias: [],
            titulo: 'Dashboard - Portfólio Kathellyn Caroline'
        });
    }
});

// Rotas da API foram movidas para routes/api.js e são carregadas via app.use('/api', apiRoutes)

// Inicializar servidor com conexão ao banco de dados
async function iniciarServidor() {
    try {
        // Testar conexão com o banco de dados
        await sequelize.authenticate();
        console.log('✓ Conexão com banco de dados MySQL estabelecida com sucesso!');

        // Sincronizar models (cria as tabelas se não existirem)
        // ATENÇÃO: Em produção, use migrations ao invés de sync()
        await sequelize.sync({ alter: false });
        console.log('✓ Models sincronizados com o banco de dados!');

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`\n========================================`);
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📍 Acesse: http://localhost:${PORT}`);
            console.log(`📊 API REST: http://localhost:${PORT}/api`);
            console.log(`🗄️  Banco de dados: ${process.env.DB_NAME || 'portfolio_db'}`);
            console.log(`========================================\n`);
        });
    } catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error.message);
        console.error('\n⚠️  Verifique se:');
        console.error('   1. O MySQL está rodando');
        console.error('   2. As credenciais no arquivo .env estão corretas');
        console.error('   3. O banco de dados existe (rode: npm run db:sync)\n');
        process.exit(1);
    }
}

// Iniciar aplicação
iniciarServidor();