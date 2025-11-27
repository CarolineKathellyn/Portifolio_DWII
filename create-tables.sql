-- ============================================
-- Script para criar as tabelas no portfolio_db
-- Execute este script depois de criar o database
-- ============================================

USE portfolio_db;

-- ============================================
-- Tabela: estudantes
-- ============================================
CREATE TABLE IF NOT EXISTS estudantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    curso VARCHAR(200) NOT NULL,
    instituicao VARCHAR(200) NOT NULL,
    ano_ingresso INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_estudante_ano_ingresso CHECK (ano_ingresso >= 2000 AND ano_ingresso <= YEAR(CURDATE()) + 1),
    CONSTRAINT chk_estudante_nome_len CHECK (CHAR_LENGTH(nome) >= 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: disciplinas
-- ============================================
CREATE TABLE IF NOT EXISTS disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL UNIQUE,
    semestre INT DEFAULT NULL,
    carga_horaria INT DEFAULT NULL,
    ativa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_disciplina_semestre CHECK (semestre IS NULL OR (semestre >= 1 AND semestre <= 6)),
    CONSTRAINT chk_disciplina_carga_horaria CHECK (carga_horaria IS NULL OR carga_horaria >= 0),
    CONSTRAINT chk_disciplina_nome_len CHECK (CHAR_LENGTH(nome) >= 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: tecnologias
-- ============================================
CREATE TABLE IF NOT EXISTS tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    categoria ENUM('linguagem', 'framework', 'biblioteca', 'banco_dados', 'ferramenta', 'outro') DEFAULT 'outro',
    nivel_conhecimento ENUM('basico', 'intermediario', 'avancado') DEFAULT 'basico',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_tecnologia_nome_len CHECK (CHAR_LENGTH(nome) >= 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: projetos
-- ============================================
CREATE TABLE IF NOT EXISTS projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    link VARCHAR(500) DEFAULT NULL,
    data_inicio DATE DEFAULT NULL,
    data_fim DATE DEFAULT NULL,
    status ENUM('planejamento', 'em_desenvolvimento', 'concluido', 'pausado', 'cancelado') NOT NULL DEFAULT 'concluido',
    destaque BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_projeto_titulo_len CHECK (CHAR_LENGTH(titulo) >= 3),
    CONSTRAINT chk_projeto_descricao_len CHECK (CHAR_LENGTH(descricao) >= 10 AND CHAR_LENGTH(descricao) <= 5000)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: contatos
-- ============================================
CREATE TABLE IF NOT EXISTS contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    telefone VARCHAR(20) DEFAULT NULL,
    linkedin VARCHAR(200) DEFAULT NULL,
    github VARCHAR(200) DEFAULT NULL,
    site_pessoal VARCHAR(200) DEFAULT NULL,
    cidade VARCHAR(100) DEFAULT NULL,
    estado VARCHAR(2) DEFAULT NULL,
    principal BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_contato_estado_len CHECK (estado IS NULL OR CHAR_LENGTH(estado) = 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: projeto_tecnologias
-- ============================================
CREATE TABLE IF NOT EXISTS projeto_tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projeto_id INT NOT NULL,
    tecnologia_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_projeto_tecnologias_projeto FOREIGN KEY (projeto_id)
        REFERENCES projetos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_projeto_tecnologias_tecnologia FOREIGN KEY (tecnologia_id)
        REFERENCES tecnologias(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uk_projeto_tecnologia UNIQUE (projeto_id, tecnologia_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Criar Índices
-- ============================================

CREATE INDEX idx_estudante_nome ON estudantes(nome);
CREATE INDEX idx_estudante_curso ON estudantes(curso);

CREATE INDEX idx_disciplina_nome ON disciplinas(nome);
CREATE INDEX idx_disciplina_semestre ON disciplinas(semestre);
CREATE INDEX idx_disciplina_ativa ON disciplinas(ativa);

CREATE INDEX idx_tecnologia_nome ON tecnologias(nome);
CREATE INDEX idx_tecnologia_categoria ON tecnologias(categoria);
CREATE INDEX idx_tecnologia_nivel ON tecnologias(nivel_conhecimento);

CREATE INDEX idx_projeto_titulo ON projetos(titulo);
CREATE INDEX idx_projeto_status ON projetos(status);
CREATE INDEX idx_projeto_destaque ON projetos(destaque);
CREATE INDEX idx_projeto_data_inicio ON projetos(data_inicio);

CREATE INDEX idx_contato_email ON contatos(email);
CREATE INDEX idx_contato_principal ON contatos(principal);

CREATE INDEX idx_projeto_tecnologias_projeto ON projeto_tecnologias(projeto_id);
CREATE INDEX idx_projeto_tecnologias_tecnologia ON projeto_tecnologias(tecnologia_id);

-- ============================================
-- Criar Views
-- ============================================

CREATE OR REPLACE VIEW vw_projetos_completo AS
SELECT
    p.id,
    p.titulo,
    p.descricao,
    p.link,
    p.data_inicio,
    p.data_fim,
    p.status,
    p.destaque,
    GROUP_CONCAT(t.nome ORDER BY t.nome SEPARATOR ', ') AS tecnologias,
    p.created_at,
    p.updated_at
FROM projetos p
LEFT JOIN projeto_tecnologias pt ON p.id = pt.projeto_id
LEFT JOIN tecnologias t ON pt.tecnologia_id = t.id
GROUP BY p.id, p.titulo, p.descricao, p.link, p.data_inicio, p.data_fim, p.status, p.destaque, p.created_at, p.updated_at;

CREATE OR REPLACE VIEW vw_estatisticas_portfolio AS
SELECT
    (SELECT COUNT(*) FROM projetos WHERE status = 'concluido') AS total_projetos_concluidos,
    (SELECT COUNT(*) FROM projetos WHERE status = 'em_desenvolvimento') AS projetos_em_andamento,
    (SELECT COUNT(*) FROM tecnologias) AS total_tecnologias,
    (SELECT COUNT(*) FROM disciplinas WHERE ativa = TRUE) AS disciplinas_ativas,
    (SELECT COUNT(*) FROM disciplinas) AS total_disciplinas;

-- ============================================
-- Mensagem de Sucesso
-- ============================================
SELECT 'Todas as tabelas foram criadas com sucesso!' AS status;
