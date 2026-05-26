const express = require('express');
const EnrollmentController = require('../controllers/EnrollmentController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         studentId:
 *           type: integer
 *         courseId:
 *           type: integer
 *         enrollmentDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, completed, cancelled]
 *         grade:
 *           type: number
 */

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Lista todas as matrículas
 *     tags: [Matrículas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de matrículas
 */
router.get('/', EnrollmentController.index);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Busca uma matrícula por ID
 *     tags: [Matrículas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da matrícula
 *       404:
 *         description: Matrícula não encontrada
 */
router.get('/:id', EnrollmentController.show);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Cria uma nova matrícula (relaciona aluno a curso)
 *     tags: [Matrículas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               enrollmentDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               status:
 *                 type: string
 *                 enum: [active, completed, cancelled]
 *                 example: active
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 *       400:
 *         description: Aluno já matriculado ou dados inválidos
 *       404:
 *         description: Aluno ou curso não encontrado
 */
router.post('/', EnrollmentController.store);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   put:
 *     summary: Atualiza uma matrícula
 *     tags: [Matrículas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, completed, cancelled]
 *               grade:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *               enrollmentDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Matrícula atualizada
 *       404:
 *         description: Matrícula não encontrada
 */
router.put('/:id', EnrollmentController.update);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Exclui uma matrícula
 *     tags: [Matrículas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Matrícula excluída
 *       404:
 *         description: Matrícula não encontrada
 */
router.delete('/:id', EnrollmentController.destroy);

module.exports = router;
