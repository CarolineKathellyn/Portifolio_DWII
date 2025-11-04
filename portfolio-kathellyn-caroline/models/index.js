const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// Inicializar Sequelize com as configurações
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: config.logging,
        define: config.define,
        pool: config.pool
    }
);

// Importar e inicializar os models
const models = {
    Estudante: require('./Estudante')(sequelize),
    Disciplina: require('./Disciplina')(sequelize),
    Tecnologia: require('./Tecnologia')(sequelize),
    Projeto: require('./Projeto')(sequelize),
    Contato: require('./Contato')(sequelize)
};

// Executar associações se existirem
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Configurar associação da Tecnologia com Projeto (outro lado do relacionamento)
models.Tecnologia.belongsToMany(models.Projeto, {
    through: 'projeto_tecnologias',
    foreignKey: 'tecnologia_id',
    otherKey: 'projeto_id',
    as: 'projetos'
});

// Exportar sequelize e models
module.exports = {
    sequelize,
    Sequelize,
    ...models
};
