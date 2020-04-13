import { Request, Response } from 'express';

export function indexResponse(req: Request, res: Response): Response {
    return res.json({ message: 'Hola api' });
}
