const express = require('express');
const router = express.Router();
const { Estudante, Disciplina, Tecnologia, Projeto, Contato } = require('../models');
const { Op } = require('sequelize');

// ============================================================
// ROTAS DA API REST - DISCIPLINAS
// ============================================================

// GET - Listar todas as disciplinas
router.get('/disciplinas', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({
            order: [['nome', 'ASC']]
        });

        res.json({
            success: true,
            total: disciplinas.length,
            data: disciplinas
        });
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar disciplinas',
            error: error.message
        });
    }
});

// GET - Buscar disciplina específica por ID
router.get('/disciplinas/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByPk(req.params.id);

        if (!disciplina) {
            return res.status(404).json({
                success: false,
                message: 'Disciplina não encontrada'
            });
        }

        res.json({
            success: true,
            data: disciplina
        });
    } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar disciplina',
            error: error.message
        });
    }
});

// POST - Adicionar nova disciplina
router.post('/disciplinas', async (req, res) => {
    try {
        const { nome, semestre, carga_horaria, ativa } = req.body;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Nome da disciplina é obrigatório'
            });
        }

        const disciplina = await Disciplina.create({
            nome,
            semestre,
            carga_horaria,
            ativa: ativa !== undefined ? ativa : true
        });

        res.status(201).json({
            success: true,
            message: 'Disciplina adicionada com sucesso',
            data: disciplina
        });
    } catch (error) {
        console.error('Erro ao criar disciplina:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Disciplina já cadastrada'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro ao criar disciplina',
            error: error.message
        });
    }
});

// PUT - Atualizar disciplina existente
router.put('/disciplinas/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByPk(req.params.id);

        if (!disciplina) {
            return res.status(404).json({
                success: false,
                message: 'Disciplina não encontrada'
            });
        }

        const { nome, semestre, carga_horaria, ativa } = req.body;

        if (nome !== undefined) disciplina.nome = nome;
        if (semestre !== undefined) disciplina.semestre = semestre;
        if (carga_horaria !== undefined) disciplina.carga_horaria = carga_horaria;
        if (ativa !== undefined) disciplina.ativa = ativa;

        await disciplina.save();

        res.json({
            success: true,
            message: 'Disciplina atualizada com sucesso',
            data: disciplina
        });
    } catch (error) {
        console.error('Erro ao atualizar disciplina:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar disciplina',
            error: error.message
        });
    }
});

// DELETE - Remover disciplina
router.delete('/disciplinas/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByPk(req.params.id);

        if (!disciplina) {
            return res.status(404).json({
                success: false,
                message: 'Disciplina não encontrada'
            });
        }

        const disciplinaData = disciplina.toJSON();
        await disciplina.destroy();

        res.json({
            success: true,
            message: 'Disciplina removida com sucesso',
            data: disciplinaData
        });
    } catch (error) {
        console.error('Erro ao remover disciplina:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao remover disciplina',
            error: error.message
        });
    }
});

// ============================================================
// ROTAS DA API REST - PROJETOS
// ============================================================

// GET - Listar todos os projetos
router.get('/projetos', async (req, res) => {
    try {
        const projetos = await Projeto.findAll({
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }],
            order: [['destaque', 'DESC'], ['created_at', 'DESC']]
        });

        res.json({
            success: true,
            total: projetos.length,
            data: projetos
        });
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar projetos',
            error: error.message
        });
    }
});

// GET - Buscar projeto específico por ID
router.get('/projetos/:id', async (req, res) => {
    try {
        const projeto = await Projeto.findByPk(req.params.id, {
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }]
        });

        if (!projeto) {
            return res.status(404).json({
                success: false,
                message: 'Projeto não encontrado'
            });
        }

        res.json({
            success: true,
            data: projeto
        });
    } catch (error) {
        console.error('Erro ao buscar projeto:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar projeto',
            error: error.message
        });
    }
});

// POST - Adicionar novo projeto
router.post('/projetos', async (req, res) => {
    try {
        const { titulo, descricao, link, data_inicio, data_fim, status, destaque, tecnologias } = req.body;

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

        const projeto = await Projeto.create({
            titulo,
            descricao,
            link: link || null,
            data_inicio,
            data_fim,
            status: status || 'concluido',
            destaque: destaque || false
        });

        // Associar tecnologias se fornecidas
        if (tecnologias && Array.isArray(tecnologias) && tecnologias.length > 0) {
            const tecIds = tecnologias.filter(id => Number.isInteger(id));
            if (tecIds.length > 0) {
                await projeto.setTecnologias(tecIds);
            }
        }

        // Buscar projeto com tecnologias
        const projetoCompleto = await Projeto.findByPk(projeto.id, {
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }]
        });

        res.status(201).json({
            success: true,
            message: 'Projeto adicionado com sucesso',
            data: projetoCompleto
        });
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao criar projeto',
            error: error.message
        });
    }
});

// PUT - Atualizar projeto existente
router.put('/projetos/:id', async (req, res) => {
    try {
        const projeto = await Projeto.findByPk(req.params.id);

        if (!projeto) {
            return res.status(404).json({
                success: false,
                message: 'Projeto não encontrado'
            });
        }

        const { titulo, descricao, link, data_inicio, data_fim, status, destaque, tecnologias } = req.body;

        // Atualizar campos
        if (titulo !== undefined) projeto.titulo = titulo;
        if (descricao !== undefined) projeto.descricao = descricao;
        if (link !== undefined) projeto.link = link;
        if (data_inicio !== undefined) projeto.data_inicio = data_inicio;
        if (data_fim !== undefined) projeto.data_fim = data_fim;
        if (status !== undefined) projeto.status = status;
        if (destaque !== undefined) projeto.destaque = destaque;

        await projeto.save();

        // Atualizar tecnologias se fornecidas
        if (tecnologias && Array.isArray(tecnologias)) {
            const tecIds = tecnologias.filter(id => Number.isInteger(id));
            await projeto.setTecnologias(tecIds);
        }

        // Buscar projeto atualizado com tecnologias
        const projetoAtualizado = await Projeto.findByPk(projeto.id, {
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }]
        });

        res.json({
            success: true,
            message: 'Projeto atualizado com sucesso',
            data: projetoAtualizado
        });
    } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar projeto',
            error: error.message
        });
    }
});

// DELETE - Remover projeto
router.delete('/projetos/:id', async (req, res) => {
    try {
        const projeto = await Projeto.findByPk(req.params.id, {
            include: [{
                model: Tecnologia,
                as: 'tecnologias',
                through: { attributes: [] }
            }]
        });

        if (!projeto) {
            return res.status(404).json({
                success: false,
                message: 'Projeto não encontrado'
            });
        }

        const projetoData = projeto.toJSON();
        await projeto.destroy();

        res.json({
            success: true,
            message: 'Projeto removido com sucesso',
            data: projetoData
        });
    } catch (error) {
        console.error('Erro ao remover projeto:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao remover projeto',
            error: error.message
        });
    }
});

// ============================================================
// ROTAS DA API REST - TECNOLOGIAS
// ============================================================

// GET - Listar todas as tecnologias
router.get('/tecnologias', async (req, res) => {
    try {
        const tecnologias = await Tecnologia.findAll({
            order: [['nome', 'ASC']]
        });

        res.json({
            success: true,
            total: tecnologias.length,
            data: tecnologias
        });
    } catch (error) {
        console.error('Erro ao buscar tecnologias:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar tecnologias',
            error: error.message
        });
    }
});

// GET - Buscar tecnologia específica por ID
router.get('/tecnologias/:id', async (req, res) => {
    try {
        const tecnologia = await Tecnologia.findByPk(req.params.id);

        if (!tecnologia) {
            return res.status(404).json({
                success: false,
                message: 'Tecnologia não encontrada'
            });
        }

        res.json({
            success: true,
            data: tecnologia
        });
    } catch (error) {
        console.error('Erro ao buscar tecnologia:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar tecnologia',
            error: error.message
        });
    }
});

// POST - Adicionar nova tecnologia
router.post('/tecnologias', async (req, res) => {
    try {
        const { nome, categoria, nivel_conhecimento } = req.body;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Nome da tecnologia é obrigatório'
            });
        }

        const tecnologia = await Tecnologia.create({
            nome,
            categoria: categoria || 'outro',
            nivel_conhecimento: nivel_conhecimento || 'basico'
        });

        res.status(201).json({
            success: true,
            message: 'Tecnologia adicionada com sucesso',
            data: tecnologia
        });
    } catch (error) {
        console.error('Erro ao criar tecnologia:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: 'Tecnologia já cadastrada'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro ao criar tecnologia',
            error: error.message
        });
    }
});

// PUT - Atualizar tecnologia existente
router.put('/tecnologias/:id', async (req, res) => {
    try {
        const tecnologia = await Tecnologia.findByPk(req.params.id);

        if (!tecnologia) {
            return res.status(404).json({
                success: false,
                message: 'Tecnologia não encontrada'
            });
        }

        const { nome, categoria, nivel_conhecimento } = req.body;

        if (nome !== undefined) tecnologia.nome = nome;
        if (categoria !== undefined) tecnologia.categoria = categoria;
        if (nivel_conhecimento !== undefined) tecnologia.nivel_conhecimento = nivel_conhecimento;

        await tecnologia.save();

        res.json({
            success: true,
            message: 'Tecnologia atualizada com sucesso',
            data: tecnologia
        });
    } catch (error) {
        console.error('Erro ao atualizar tecnologia:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar tecnologia',
            error: error.message
        });
    }
});

// DELETE - Remover tecnologia
router.delete('/tecnologias/:id', async (req, res) => {
    try {
        const tecnologia = await Tecnologia.findByPk(req.params.id);

        if (!tecnologia) {
            return res.status(404).json({
                success: false,
                message: 'Tecnologia não encontrada'
            });
        }

        const tecnologiaData = tecnologia.toJSON();
        await tecnologia.destroy();

        res.json({
            success: true,
            message: 'Tecnologia removida com sucesso',
            data: tecnologiaData
        });
    } catch (error) {
        console.error('Erro ao remover tecnologia:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao remover tecnologia',
            error: error.message
        });
    }
});

// ============================================================
// ROTAS DA API REST - INFORMAÇÕES GERAIS
// ============================================================

// GET - Estatísticas gerais
router.get('/estatisticas', async (req, res) => {
    try {
        const totalDisciplinas = await Disciplina.count();
        const totalProjetos = await Projeto.count();
        const totalTecnologias = await Tecnologia.count();
        const estudante = await Estudante.findOne();

        res.json({
            success: true,
            data: {
                totalDisciplinas,
                totalProjetos,
                totalTecnologias,
                estudante
            }
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estatísticas',
            error: error.message
        });
    }
});

// GET - Informações do estudante
router.get('/estudante', async (req, res) => {
    try {
        const estudante = await Estudante.findOne();

        if (!estudante) {
            return res.status(404).json({
                success: false,
                message: 'Estudante não encontrado'
            });
        }

        res.json({
            success: true,
            data: estudante
        });
    } catch (error) {
        console.error('Erro ao buscar estudante:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estudante',
            error: error.message
        });
    }
});

// PUT - Atualizar informações do estudante
router.put('/estudante', async (req, res) => {
    try {
        let estudante = await Estudante.findOne();

        if (!estudante) {
            return res.status(404).json({
                success: false,
                message: 'Estudante não encontrado'
            });
        }

        const { nome, curso, instituicao, ano_ingresso } = req.body;

        if (nome !== undefined) estudante.nome = nome;
        if (curso !== undefined) estudante.curso = curso;
        if (instituicao !== undefined) estudante.instituicao = instituicao;
        if (ano_ingresso !== undefined) estudante.ano_ingresso = ano_ingresso;

        await estudante.save();

        res.json({
            success: true,
            message: 'Informações do estudante atualizadas com sucesso',
            data: estudante
        });
    } catch (error) {
        console.error('Erro ao atualizar estudante:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar estudante',
            error: error.message
        });
    }
});

// GET - Informações de contato
router.get('/contato', async (req, res) => {
    try {
        const contato = await Contato.findOne({
            where: { principal: true }
        });

        if (!contato) {
            return res.status(404).json({
                success: false,
                message: 'Contato não encontrado'
            });
        }

        res.json({
            success: true,
            data: contato
        });
    } catch (error) {
        console.error('Erro ao buscar contato:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar contato',
            error: error.message
        });
    }
});

// PUT - Atualizar informações de contato
router.put('/contato', async (req, res) => {
    try {
        let contato = await Contato.findOne({
            where: { principal: true }
        });

        if (!contato) {
            return res.status(404).json({
                success: false,
                message: 'Contato não encontrado'
            });
        }

        const { email, telefone, linkedin, github, site_pessoal, cidade, estado } = req.body;

        if (email !== undefined) contato.email = email;
        if (telefone !== undefined) contato.telefone = telefone;
        if (linkedin !== undefined) contato.linkedin = linkedin;
        if (github !== undefined) contato.github = github;
        if (site_pessoal !== undefined) contato.site_pessoal = site_pessoal;
        if (cidade !== undefined) contato.cidade = cidade;
        if (estado !== undefined) contato.estado = estado;

        await contato.save();

        res.json({
            success: true,
            message: 'Informações de contato atualizadas com sucesso',
            data: contato
        });
    } catch (error) {
        console.error('Erro ao atualizar contato:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar contato',
            error: error.message
        });
    }
});

module.exports = router;
