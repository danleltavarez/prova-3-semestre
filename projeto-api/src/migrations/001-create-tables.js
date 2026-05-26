const bcrypt = require('bcrypt');

module.exports = async (sequelize) => {
  const queryInterface = sequelize.getQueryInterface();

  // Criar tabela users
  await queryInterface.createTable('users', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize.Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: sequelize.Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    password: {
      type: sequelize.Sequelize.STRING(255),
      allowNull: false
    },
    created_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Criar tabela students
  await queryInterface.createTable('students', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize.Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: sequelize.Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    cpf: {
      type: sequelize.Sequelize.STRING(14),
      allowNull: false,
      unique: true
    },
    birth_date: {
      type: sequelize.Sequelize.DATEONLY,
      allowNull: true
    },
    phone: {
      type: sequelize.Sequelize.STRING(20),
      allowNull: true
    },
    created_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Criar tabela courses
  await queryInterface.createTable('courses', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize.Sequelize.STRING(150),
      allowNull: false
    },
    description: {
      type: sequelize.Sequelize.TEXT,
      allowNull: true
    },
    workload: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 40
    },
    price: {
      type: sequelize.Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    active: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: true
    },
    created_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Criar tipo ENUM para status
  await sequelize.query(`
    DO $$ BEGIN
      CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'cancelled');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  // Criar tabela enrollments (tabela pivô)
  await queryInterface.createTable('enrollments', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    course_id: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    enrollment_date: {
      type: sequelize.Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.Sequelize.literal('CURRENT_DATE')
    },
    status: {
      type: sequelize.Sequelize.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active'
    },
    grade: {
      type: sequelize.Sequelize.DECIMAL(4, 2),
      allowNull: true
    },
    created_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: sequelize.Sequelize.DATE,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Criar índice único para evitar duplicação de matrícula
  await queryInterface.addIndex('enrollments', ['student_id', 'course_id'], {
    unique: true,
    name: 'enrollments_student_course_unique'
  });

  // Inserir usuário administrador padrão
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await queryInterface.bulkInsert('users', [{
    name: 'Administrador',
    email: 'admin@escola.com',
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date()
  }]);

  console.log('✅ Todas as tabelas foram criadas com sucesso!');
  console.log('👤 Usuário admin criado: admin@escola.com / admin123');
};
