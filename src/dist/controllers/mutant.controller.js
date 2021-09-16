"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../utils/validate");
const mutant_service_1 = require("../services/mutant.service");
// Valida si una secuencia es valida y si es de un mutante
const isMutant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate sequence
    let sequence = req.body.dna ? req.body.dna : "[]";
    let validation = (0, validate_1.validateAdn)(sequence);
    if (!validation.valid) {
        res.status(400).json({
            code: 400,
            message: validation.message,
        });
    }
    let isMutant = (0, mutant_service_1.checkSequenceService)(sequence);
    if (isMutant) {
        (0, mutant_service_1.saveDataService)(sequence, true);
        return res.status(200).end();
    }
    else {
        (0, mutant_service_1.saveDataService)(sequence, false);
        return res.status(403).end();
    }
});
// Retorna las estadisticas
const getStats = (req, res, next) => {
    (0, mutant_service_1.getStatsService)().then((data) => {
        res.status(200).json(data);
    });
};
exports.default = {
    isMutant,
    getStats,
};
