import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handdleInputErrors } from "../middleware/validator";
import { TaskController } from "../controllers/TaskController";
import { projectExistsValidator } from "../middleware/project";
import { hasAuthorization, taskBelongsToProject, taskExistsValidator } from "../middleware/task";
import { autenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router()

router.use(autenticate)

// PROJECT ROUTES


router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handdleInputErrors,
    ProjectController.createProject
)

router.get('/',
    ProjectController.getAllProjects
)

router.get('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    ProjectController.getProjectById
)

router.param('projectId', projectExistsValidator)

router.put('/:projectId',
    param('projectId').isMongoId().withMessage('Id no valido'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handdleInputErrors,
    hasAuthorization,
    ProjectController.updateProject
)

router.delete('/:projectId',
    param('projectId').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    hasAuthorization,
    ProjectController.deleteProject
)

// TASK ROUTES

router.post('/:projectId/tasks',
    hasAuthorization,
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handdleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getAllTasks
)

router.param('taskId', taskExistsValidator)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handdleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('status').notEmpty().withMessage('El nuevo estado es obligatorio'),
    handdleInputErrors,
    TaskController.updateStatus
)

// USER ROUTES

router.post('/:projectId/team/find',
    body('email').isEmail().toLowerCase().withMessage('Correo no valido'),
    handdleInputErrors,
    TeamMemberController.findMemberByTeam
)

router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
)

router.post('/:projectId/team',
    body('id').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    TeamMemberController.removeMemberById
)

// NOTES ROUTES

router.post('/:projectId/tasks/:taskId/notes',
    body('content').notEmpty().withMessage('El contenido es obligatorio'),
    handdleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('Id no valido'),
    handdleInputErrors,
    NoteController.deleteNote
)

export default router