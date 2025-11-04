const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tecnologia = sequelize.define('Tecnologia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                msg: 'Esta tecnologia já está cadastrada'
            },
            validate: {
                notEmpty: {
                    msg: 'Nome da tecnologia não pode ser vazio'
                },
                len: {
                    args: [2, 100],
                    msg: 'Nome da tecnologia deve ter entre 2 e 100 caracteres'
                }
            }
        },
        categoria: {
            type: DataTypes.ENUM('linguagem', 'framework', 'biblioteca', 'banco_dados', 'ferramenta', 'outro'),
            allowNull: true,
            defaultValue: 'outro'
        },
        nivel_conhecimento: {
            type: DataTypes.ENUM('basico', 'intermediario', 'avancado'),
            allowNull: true,
            defaultValue: 'basico'
        }
    }, {
        tableName: 'tecnologias',
        timestamps: true,
        underscored: true
    });

    return Tecnologia;
};
