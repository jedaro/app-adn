"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mutant_controller_1 = __importDefault(require("../controllers/mutant.controller"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('API Rest Mutantes').status(200);
});
router.post('/mutant', mutant_controller_1.default.isMutant);
router.get('/stats', mutant_controller_1.default.getStats);
module.exports = router;
