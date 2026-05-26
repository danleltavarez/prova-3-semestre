const express = require('express');
const StudentController = require('../controllers/StudentController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         cpf:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date
 *         phone:
 *           type: string
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos com seus cursos
 */
router.get('/', StudentController.index);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Busca um aluno por ID
 *     tags: [Alunos]
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
 *         description: Dados do aluno
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/:id', StudentController.show);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
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
 *               - email
 *               - cpf
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-15
 *               phone:
 *                 type: string
 *                 example: (11) 99999-9999
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', StudentController.store);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Atualiza um aluno
 *     tags: [Alunos]
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
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', StudentController.update);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Exclui um aluno
 *     tags: [Alunos]
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
 *         description: Aluno excluído
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/:id', StudentController.destroy);

module.exports = router;
