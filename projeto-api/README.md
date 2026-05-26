# API de Gestão de Cursos e Matrículas

Sistema de APIs REST para gestão de cursos, alunos e matrículas escolares.

## 📋 Descrição

Esta API permite o gerenciamento completo de:
- **Usuários** - Cadastro e autenticação de administradores
- **Alunos** - Cadastro e gerenciamento de estudantes
- **Cursos** - Cadastro e gerenciamento de cursos
- **Matrículas** - Vinculação de alunos a cursos (relação N:N)

## 🗃️ Entidades, Tabelas e Relacionamentos

### Tabelas do Banco de Dados

| Tabela | Descrição |
|--------|-----------|
| `users` | Usuários do sistema (administradores) |
| `students` | Alunos cadastrados |
| `courses` | Cursos disponíveis |
| `enrollments` | **Tabela Pivô** - Matrículas (relação N:N entre alunos e cursos) |

### Relacionamentos

