import { Request, Response } from "express";
import Note, { INote } from "../models/Note";
import { Types } from "mongoose";

export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        const { content } = req.body
        const note = new Note()
        note.createdBy = req.user.id
        note.task = req.task.id
        note.content = content
        req.task.notes.push(note.id)
        try {
            await Promise.allSettled([note.save(), req.task.save()])
            res.send('Nota creada correctamente')
        } catch (error) {
            res.status(500).send('Hubo un error')
        }
    }

    static getTaskNotes = async (req: Request, res: Response) => {
        const notes = await Note.find({ task: req.task.id })
        try {
            res.json(notes)
        } catch (error) {
            res.status(500).send('Hubo un error')
        }
    }

    static deleteNote = async (req: Request<{ noteId: Types.ObjectId }>, res: Response) => {
        const { noteId } = req.params
        const note = await Note.findById(noteId)
        if (!note) {
            const error = new Error("Nota no encontrada")
            return res.status(404).json({ error: error.message })
        }
        if (note.createdBy.toString() !== req.user.id.toString()) {
            const error = new Error("Acción no valida")
            return res.status(401).json({ error: error.message })
        }
        try {
            req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())
            await Promise.allSettled([note.deleteOne(), req.task.save()])
            res.json('Nota eliminada correctamente')
        } catch (error) {
            res.status(500).send('Hubo un error')
        }
    }


}