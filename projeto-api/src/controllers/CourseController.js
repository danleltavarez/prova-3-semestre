const { Course, Student, Enrollment } = require('../models');

class CourseController {
  // GET /courses - Listar todos os cursos
  async index(req, res) {
    try {
      const courses = await Course.findAll({
        order: [['name', 'ASC']],
        include: [{
          model: Student,
          as: 'students',
          through: { attributes: ['status', 'grade'] }
        }]
      });
      return res.json(courses);
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      return res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }

  // GET /courses/:id - Buscar curso por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: [{
          model: Student,
          as: 'students',
          through: { attributes: ['status', 'grade', 'enrollmentDate'] }
        }]
      });

      if (!course) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }

      return res.json(course);
    } catch (error) {
      console.error('Erro ao buscar curso:', error);
      return res.status(500).json({ error: 'Erro ao buscar curso' });
    }
  }

  // POST /courses - Criar novo curso
  async store(req, res) {
    try {
      const { name, description, workload, price, active } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'O nome do curso é obrigatório' });
      }

      const course = await Course.create({
        name,
        description,
        workload: workload || 40,
        price: price || 0,
        active: active !== undefined ? active : true
      });

      return res.status(201).json(course);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(500).json({ error: 'Erro ao criar curso' });
    }
  }

  // PUT /courses/:id - Atualizar curso
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, workload, price, active } = req.body;

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }

      await course.update({
        name: name || course.name,
        description: description !== undefined ? description : course.description,
        workload: workload || course.workload,
        price: price !== undefined ? price : course.price,
        active: active !== undefined ? active : course.active
      });

      return res.json(course);
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      return res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
  }

  // DELETE /courses/:id - Excluir curso
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }

      await course.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      return res.status(500).json({ error: 'Erro ao excluir curso' });
    }
  }
}

module.exports = new CourseController();
