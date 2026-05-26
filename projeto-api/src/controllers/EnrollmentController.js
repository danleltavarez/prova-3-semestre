const { Enrollment, Student, Course } = require('../models');

class EnrollmentController {
  // GET /enrollments - Listar todas as matrículas
  async index(req, res) {
    try {
      const enrollments = await Enrollment.findAll({
        include: [
          { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
          { model: Course, as: 'course', attributes: ['id', 'name'] }
        ],
        order: [['enrollmentDate', 'DESC']]
      });
      return res.json(enrollments);
    } catch (error) {
      console.error('Erro ao listar matrículas:', error);
      return res.status(500).json({ error: 'Erro ao listar matrículas' });
    }
  }

  // GET /enrollments/:id - Buscar matrícula por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const enrollment = await Enrollment.findByPk(id, {
        include: [
          { model: Student, as: 'student' },
          { model: Course, as: 'course' }
        ]
      });

      if (!enrollment) {
        return res.status(404).json({ error: 'Matrícula não encontrada' });
      }

      return res.json(enrollment);
    } catch (error) {
      console.error('Erro ao buscar matrícula:', error);
      return res.status(500).json({ error: 'Erro ao buscar matrícula' });
    }
  }

  // POST /enrollments - Criar nova matrícula
  async store(req, res) {
    try {
      const { studentId, courseId, enrollmentDate, status } = req.body;

      if (!studentId || !courseId) {
        return res.status(400).json({ error: 'ID do aluno e ID do curso são obrigatórios' });
      }

      // Verificar se o aluno existe
      const student = await Student.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      // Verificar se o curso existe
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }

      // Verificar se já existe matrícula
      const existingEnrollment = await Enrollment.findOne({
        where: { studentId, courseId }
      });

      if (existingEnrollment) {
        return res.status(400).json({ error: 'Aluno já está matriculado neste curso' });
      }

      const enrollment = await Enrollment.create({
        studentId,
        courseId,
        enrollmentDate: enrollmentDate || new Date(),
        status: status || 'active'
      });

      const enrollmentWithRelations = await Enrollment.findByPk(enrollment.id, {
        include: [
          { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
          { model: Course, as: 'course', attributes: ['id', 'name'] }
        ]
      });

      return res.status(201).json(enrollmentWithRelations);
    } catch (error) {
      console.error('Erro ao criar matrícula:', error);
      return res.status(500).json({ error: 'Erro ao criar matrícula' });
    }
  }

  // PUT /enrollments/:id - Atualizar matrícula
  async update(req, res) {
    try {
      const { id } = req.params;
      const { status, grade, enrollmentDate } = req.body;

      const enrollment = await Enrollment.findByPk(id);

      if (!enrollment) {
        return res.status(404).json({ error: 'Matrícula não encontrada' });
      }

      await enrollment.update({
        status: status || enrollment.status,
        grade: grade !== undefined ? grade : enrollment.grade,
        enrollmentDate: enrollmentDate || enrollment.enrollmentDate
      });

      const updatedEnrollment = await Enrollment.findByPk(id, {
        include: [
          { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
          { model: Course, as: 'course', attributes: ['id', 'name'] }
        ]
      });

      return res.json(updatedEnrollment);
    } catch (error) {
      console.error('Erro ao atualizar matrícula:', error);
      return res.status(500).json({ error: 'Erro ao atualizar matrícula' });
    }
  }

  // DELETE /enrollments/:id - Excluir matrícula
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const enrollment = await Enrollment.findByPk(id);

      if (!enrollment) {
        return res.status(404).json({ error: 'Matrícula não encontrada' });
      }

      await enrollment.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir matrícula:', error);
      return res.status(500).json({ error: 'Erro ao excluir matrícula' });
    }
  }
}

module.exports = new EnrollmentController();
