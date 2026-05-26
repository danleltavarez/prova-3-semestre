const { Student, Course, Enrollment } = require('../models');

class StudentController {
  // GET /students - Listar todos os alunos
  async index(req, res) {
    try {
      const students = await Student.findAll({
        order: [['name', 'ASC']],
        include: [{
          model: Course,
          as: 'courses',
          through: { attributes: ['status', 'grade', 'enrollmentDate'] }
        }]
      });
      return res.json(students);
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      return res.status(500).json({ error: 'Erro ao listar alunos' });
    }
  }

  // GET /students/:id - Buscar aluno por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id, {
        include: [{
          model: Course,
          as: 'courses',
          through: { attributes: ['status', 'grade', 'enrollmentDate'] }
        }]
      });

      if (!student) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      return res.json(student);
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      return res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
  }

  // POST /students - Criar novo aluno
  async store(req, res) {
    try {
      const { name, email, cpf, birthDate, phone } = req.body;

      if (!name || !email || !cpf) {
        return res.status(400).json({ error: 'Nome, email e CPF são obrigatórios' });
      }

      const student = await Student.create({
        name,
        email,
        cpf,
        birthDate,
        phone
      });

      return res.status(201).json(student);
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
      }
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(500).json({ error: 'Erro ao criar aluno' });
    }
  }

  // PUT /students/:id - Atualizar aluno
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, cpf, birthDate, phone } = req.body;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      await student.update({
        name: name || student.name,
        email: email || student.email,
        cpf: cpf || student.cpf,
        birthDate: birthDate !== undefined ? birthDate : student.birthDate,
        phone: phone !== undefined ? phone : student.phone
      });

      return res.json(student);
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
  }

  // DELETE /students/:id - Excluir aluno
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      await student.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      return res.status(500).json({ error: 'Erro ao excluir aluno' });
    }
  }
}

module.exports = new StudentController();
