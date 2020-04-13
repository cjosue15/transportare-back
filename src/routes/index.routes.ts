import { Router } from 'express';
const router = Router();

import { indexResponse } from '../controllers/index.controller';

router.route('/').get(indexResponse);

export default router;
