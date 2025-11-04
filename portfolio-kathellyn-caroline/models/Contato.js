const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Contato = sequelize.define('Contato', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: {
                msg: 'Este email já está cadastrado'
            },
            validate: {
                isEmail: {
                    msg: 'Email inválido'
                },
                notEmpty: {
                    msg: 'Email não pode ser vazio'
                }
            }
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                is: {
                    args: /^[\d\s\-\(\)\+]+$/,
                    msg: 'Telefone contém caracteres inválidos'
                }
            }
        },
        linkedin: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        github: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        site_pessoal: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Site pessoal deve ser uma URL válida'
                }
            }
        },
        cidade: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING(2),
            allowNull: true,
            validate: {
                len: {
                    args: [2, 2],
                    msg: 'Estado deve ter 2 caracteres (UF)'
                }
            }
        },
        principal: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        tableName: 'contatos',
        timestamps: true,
        underscored: true
    });

    return Contato;
};
