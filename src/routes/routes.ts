import express from 'express';
import controller from '../controllers/mutant.controller';
const router = express.Router();


router.get('/', (req, res) => {
   res.send('API Rest Mutantes').status(200);
});
router.post('/mutant', controller.isMutant);
router.get('/stats', controller.getStats);
router.delete('/destroy', controller.destroy);

export = router;