const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O nome é obrigatório' },
        len: { args: [2, 100], msg: 'O nome deve ter entre 2 e 100 caracteres' }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: {
        msg: 'Este email já está cadastrado'
      },
      validate: {
        isEmail: { msg: 'Email inválido' }
      }
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: {
        msg: 'Este CPF já está cadastrado'
      }
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'birth_date'
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Student;
};
