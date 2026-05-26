require('dotenv').config();
const { sequelize } = require('./src/models');
const runMigrations = require('./src/migrations/001-create-tables');

const commands = {
  async migrate() {
    try {
      console.log('🔄 Iniciando migrations...');
      await sequelize.authenticate();
      console.log('✅ Conexão estabelecida.');
      
      await runMigrations(sequelize);
      
      console.log('✅ Migrations executadas com sucesso!');
      process.exit(0);
    } catch (error) {
      console.error('❌ Erro ao executar migrations:', error);
      process.exit(1);
    }
  },

  async seed() {
    try {
      const bcrypt = require('bcrypt');
      const { User, Student, Course } = require('./src/models');
      
      await sequelize.authenticate();
      
      // Criar usuário admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.findOrCreate({
        where: { email: 'admin@escola.com' },
        defaults: {
          name: 'Administrador',
          email: 'admin@escola.com',
          password: hashedPassword
        }
      });

      console.log('✅ Seeds executados com sucesso!');
      process.exit(0);
    } catch (error) {
      console.error('❌ Erro ao executar seeds:', error);
      process.exit(1);
    }
  }
};

const command = process.argv[2];

if (commands[command]) {
  commands[command]();
} else {
  console.log('Comandos disponíveis:');
  console.log('  node command.js migrate  - Executa as migrations');
  console.log('  node command.js seed     - Popula o banco com dados iniciais');
  process.exit(1);
}
