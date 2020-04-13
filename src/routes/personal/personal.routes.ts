import { Router } from 'express';
import {
    getPersonales,
    createPersonal,
    updatePersonal,
    getOnePersonal,
    deletePersonal,
} from '../../controllers/personal.controller';

const router = Router();

router.route('/').get(getPersonales).post(createPersonal);

router.route('/:id').put(updatePersonal).get(getOnePersonal).delete(deletePersonal);

export default router;
