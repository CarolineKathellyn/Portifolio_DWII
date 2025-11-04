const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Projeto = sequelize.define('Projeto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Título do projeto não pode ser vazio'
                },
                len: {
                    args: [3, 200],
                    msg: 'Título deve ter entre 3 e 200 caracteres'
                }
            }
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Descrição não pode ser vazia'
                },
                len: {
                    args: [10, 5000],
                    msg: 'Descrição deve ter entre 10 e 5000 caracteres'
                }
            }
        },
        link: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Link deve ser uma URL válida'
                }
            }
        },
        data_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        data_fim: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('planejamento', 'em_desenvolvimento', 'concluido', 'pausado', 'cancelado'),
            defaultValue: 'concluido',
            allowNull: false
        },
        destaque: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        tableName: 'projetos',
        timestamps: true,
        underscored: true
    });

    // Definir associação com Tecnologia (muitos-para-muitos)
    Projeto.associate = (models) => {
        Projeto.belongsToMany(models.Tecnologia, {
            through: 'projeto_tecnologias',
            foreignKey: 'projeto_id',
            otherKey: 'tecnologia_id',
            as: 'tecnologias'
        });
    };

    return Projeto;
};
