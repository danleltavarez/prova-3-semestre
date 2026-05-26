const express = require('express');
const CourseController = require('../controllers/CourseController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         workload:
 *           type: integer
 *         price:
 *           type: number
 *         active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos com alunos matriculados
 */
router.get('/', CourseController.index);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Busca um curso por ID
 *     tags: [Cursos]
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
 *         description: Dados do curso
 *       404:
 *         description: Curso não encontrado
 */
router.get('/:id', CourseController.show);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Desenvolvimento Web
 *               description:
 *                 type: string
 *                 example: Curso completo de desenvolvimento web
 *               workload:
 *                 type: integer
 *                 example: 120
 *               price:
 *                 type: number
 *                 example: 1500.00
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', CourseController.store);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Atualiza um curso
 *     tags: [Cursos]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               workload:
 *                 type: integer
 *               price:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Curso atualizado
 *       404:
 *         description: Curso não encontrado
 */
router.put('/:id', CourseController.update);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Exclui um curso
 *     tags: [Cursos]
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
 *         description: Curso excluído
 *       404:
 *         description: Curso não encontrado
 */
router.delete('/:id', CourseController.destroy);

module.exports = router;
