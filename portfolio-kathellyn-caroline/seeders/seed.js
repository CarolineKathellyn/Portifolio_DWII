const { sequelize, Estudante, Disciplina, Tecnologia, Projeto, Contato } = require('../models');

async function seed() {
    try {
        console.log('Iniciando seed do banco de dados...');

        // Limpar dados existentes (opcional - cuidado em produção!)
        await sequelize.sync({ force: true });
        console.log('Tabelas sincronizadas!');

        // 1. Criar Estudante
        const estudante = await Estudante.create({
            nome: 'Kathellyn Caroline Alves dos Santos',
            curso: 'Desenvolvimento de Software Multiplataforma',
            instituicao: 'FATEC Jessen Vidal - São José dos Campos',
            ano_ingresso: 2024
        });
        console.log('✓ Estudante criado');

        // 2. Criar Disciplinas
        const disciplinasData = [
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

        for (const nomeDisciplina of disciplinasData) {
            await Disciplina.create({ nome: nomeDisciplina });
        }
        console.log(`✓ ${disciplinasData.length} disciplinas criadas`);

        // 3. Criar Tecnologias
        const tecnologiasData = [
            { nome: 'Python', categoria: 'linguagem', nivel_conhecimento: 'avancado' },
            { nome: 'Java', categoria: 'linguagem', nivel_conhecimento: 'avancado' },
            { nome: 'JavaScript', categoria: 'linguagem', nivel_conhecimento: 'avancado' },
            { nome: 'Node.js', categoria: 'framework', nivel_conhecimento: 'avancado' },
            { nome: 'TypeScript', categoria: 'linguagem', nivel_conhecimento: 'intermediario' },
            { nome: 'React', categoria: 'biblioteca', nivel_conhecimento: 'intermediario' },
            { nome: 'React Native', categoria: 'framework', nivel_conhecimento: 'intermediario' },
            { nome: 'MySQL', categoria: 'banco_dados', nivel_conhecimento: 'avancado' },
            { nome: 'MongoDB', categoria: 'banco_dados', nivel_conhecimento: 'intermediario' },
            { nome: 'Cassandra', categoria: 'banco_dados', nivel_conhecimento: 'basico' },
            { nome: 'Neo4j', categoria: 'banco_dados', nivel_conhecimento: 'basico' },
            { nome: 'Redis', categoria: 'banco_dados', nivel_conhecimento: 'basico' },
            { nome: 'Flask', categoria: 'framework', nivel_conhecimento: 'intermediario' },
            { nome: 'Spring Boot', categoria: 'framework', nivel_conhecimento: 'intermediario' },
            { nome: 'AWS', categoria: 'ferramenta', nivel_conhecimento: 'intermediario' },
            { nome: 'Prisma ORM', categoria: 'biblioteca', nivel_conhecimento: 'intermediario' },
            { nome: 'HTML5', categoria: 'linguagem', nivel_conhecimento: 'avancado' },
            { nome: 'CSS3', categoria: 'linguagem', nivel_conhecimento: 'avancado' },
            { nome: 'Bootstrap', categoria: 'framework', nivel_conhecimento: 'intermediario' }
        ];

        const tecnologiasCriadas = [];
        for (const tecData of tecnologiasData) {
            const tec = await Tecnologia.create(tecData);
            tecnologiasCriadas.push(tec);
        }
        console.log(`✓ ${tecnologiasCriadas.length} tecnologias criadas`);

        // 4. Criar Projetos com suas tecnologias
        const projetosData = [
            {
                titulo: 'Sistema Gerenciador de Estoque - ProStock',
                descricao: 'Sistema de controle automatizado de estoque desenvolvido como projeto acadêmico interno com foco em automação e controle logístico. Oferece controle automatizado de produtos, movimentações em tempo real, cadastro e gestão de fornecedores.',
                link: 'https://github.com/usuario/prostock',
                status: 'concluido',
                destaque: true,
                tecnologias: ['Node.js', 'MySQL', 'React', 'Prisma ORM']
            },
            {
                titulo: 'Sistema de Agricultura Indoor - GreenTECH',
                descricao: 'Aplicação web para monitoramento e controle de sistemas de agricultura indoor utilizando sensores IoT e Arduino para coleta de dados ambientais.',
                link: 'https://github.com/FabioHiros/API-GreenTECH',
                status: 'concluido',
                destaque: true,
                tecnologias: ['Python', 'Flask', 'HTML5', 'CSS3', 'Bootstrap', 'MySQL', 'AWS']
            },
            {
                titulo: 'ChatBot Assistente de Vendas ML',
                descricao: 'Assistente virtual para e-commerce baseado em modelos de linguagem (LLMs) e processamento de linguagem natural (NLP), capaz de entender necessidades dos usuários e recomendar produtos.',
                link: 'https://github.com/usuario/chatbot-vendas',
                status: 'concluido',
                destaque: false,
                tecnologias: ['Python', 'Flask', 'MySQL']
            },
            {
                titulo: 'Sistema de Ponto Eletrônico - NectoPoint',
                descricao: 'Sistema completo de controle de ponto eletrônico com funcionalidades de controle automatizado, alertas em tempo real, gestão de jornadas flexíveis e relatórios analíticos.',
                link: 'https://github.com/Equipe-Skyfall/nectopoint-front',
                status: 'concluido',
                destaque: true,
                tecnologias: ['Java', 'Spring Boot', 'React', 'TypeScript', 'AWS', 'MySQL', 'MongoDB']
            }
        ];

        for (const projData of projetosData) {
            const { tecnologias, ...projetoInfo } = projData;
            const projeto = await Projeto.create(projetoInfo);

            // Associar tecnologias ao projeto
            const tecsProjeto = tecnologiasCriadas.filter(t => tecnologias.includes(t.nome));
            await projeto.setTecnologias(tecsProjeto);
        }
        console.log(`✓ ${projetosData.length} projetos criados com suas tecnologias`);

        // 5. Criar Contato
        const contato = await Contato.create({
            email: 'kathellyn.carolineas@gmail.com',
            telefone: '12988054039',
            linkedin: 'kathellyn-caroline-a562101b9',
            principal: true
        });
        console.log('✓ Contato criado');

        console.log('\n✅ Seed concluído com sucesso!');
        console.log(`
========================================
Dados inseridos:
- 1 Estudante
- ${disciplinasData.length} Disciplinas
- ${tecnologiasCriadas.length} Tecnologias
- ${projetosData.length} Projetos
- 1 Contato
========================================
        `);

    } catch (error) {
        console.error('❌ Erro ao executar seed:', error);
        console.error('Detalhes:', error.message);
    } finally {
        await sequelize.close();
        console.log('Conexão com banco de dados fechada.');
    }
}

// Executar seed
seed();
