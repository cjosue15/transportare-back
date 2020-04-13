import { createConnection } from '../mysql/database';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export async function getPersonales(req: Request, res: Response) {
    try {
        const conn = await createConnection();

        const query = 'SELECT * FROM Personal';

        const response = await conn?.query(query);

        const rows = <RowDataPacket>response?.[0];

        if (rows.length === 0) {
            return res.json({
                state: false,
                message: 'No hay data para mostrar',
            });
        }

        return res.json({ state: true, data: rows });
    } catch (error) {
        return res.json({ state: false, error });
    }
}

export async function getOnePersonal(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const conn = await createConnection();

        const query = `SELECT * FROM Personal WHERE IdPersonal = ?`;

        const response = await conn?.query(query, [id]);

        const rows = <RowDataPacket>response?.[0];

        if (rows.length === 0) {
            return res.status(400).json({
                state: false,
                message: `El usuario ${id} no fue encontrado`,
            });
        }

        return res.json({ state: true, data: rows[0] });
    } catch (error) {
        return res.json({ state: false, error });
    }
}

export async function createPersonal(req: Request, res: Response) {
    try {
        const body = req.body;

        body.flag_activo = true;

        const conn = await createConnection();

        await conn?.query('INSERT INTO Personal SET ?', [body]);

        res.json({
            state: true,
            message: 'Personal creado',
        });
    } catch (error) {
        return res.json({ state: false, error });
    }
}

export async function updatePersonal(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const body = req.body;

        const conn = await createConnection();

        await conn?.query('UPDATE Personal SET ? WHERE IdPersonal = ?', [body, id]);

        res.json({
            state: true,
            message: 'Personal actualizado',
        });
    } catch (error) {
        return res.status(400).json({
            state: false,
            error,
        });
    }
}

export async function deletePersonal(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const conn = await createConnection();

        const query = `SELECT * FROM Personal WHERE IdPersonal = ?`;

        const response = await conn?.query(query, [id]);

        const rows = <RowDataPacket>response?.[0];

        console.log(rows);

        if (rows.length === 0) {
            return res.status(400).json({
                state: false,
                message: `El usuario ${id} no fue encontrado`,
            });
        }

        const user = rows[0];

        if (user.flag_activo === 0) {
            return res.status(400).json({
                state: false,
                message: `El usuario ${id} no existe`,
            });
        }

        await conn?.query('UPDATE Personal SET flag_activo = false WHERE IdPersonal = ?', [id]);

        res.json({
            state: true,
            message: 'Personal Eliminado',
        });
    } catch (error) {
        res.status(400).json({
            state: false,
            error,
        });
    }
}
