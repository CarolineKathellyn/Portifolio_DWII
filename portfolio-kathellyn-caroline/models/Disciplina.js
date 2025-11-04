const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Disciplina = sequelize.define('Disciplina', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: {
                msg: 'Esta disciplina já está cadastrada'
            },
            validate: {
                notEmpty: {
                    msg: 'Nome da disciplina não pode ser vazio'
                },
                len: {
                    args: [3, 200],
                    msg: 'Nome da disciplina deve ter entre 3 e 200 caracteres'
                }
            }
        },
        semestre: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: {
                    msg: 'Semestre deve ser um número inteiro'
                },
                min: {
                    args: [1],
                    msg: 'Semestre deve ser no mínimo 1'
                },
                max: {
                    args: [6],
                    msg: 'Semestre deve ser no máximo 6'
                }
            }
        },
        carga_horaria: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: {
                    msg: 'Carga horária deve ser um número inteiro'
                },
                min: {
                    args: [0],
                    msg: 'Carga horária deve ser maior ou igual a 0'
                }
            }
        },
        ativa: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        tableName: 'disciplinas',
        timestamps: true,
        underscored: true
    });

    return Disciplina;
};
