const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Estudante = sequelize.define('Estudante', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nome não pode ser vazio'
                },
                len: {
                    args: [3, 200],
                    msg: 'Nome deve ter entre 3 e 200 caracteres'
                }
            }
        },
        curso: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Curso não pode ser vazio'
                }
            }
        },
        instituicao: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Instituição não pode ser vazia'
                }
            }
        },
        ano_ingresso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Ano de ingresso deve ser um número inteiro'
                },
                min: {
                    args: [2000],
                    msg: 'Ano de ingresso deve ser maior que 2000'
                },
                max: {
                    args: [new Date().getFullYear() + 1],
                    msg: 'Ano de ingresso não pode ser no futuro'
                }
            }
        }
    }, {
        tableName: 'estudantes',
        timestamps: true,
        underscored: true
    });

    return Estudante;
};
