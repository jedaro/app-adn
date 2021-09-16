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
exports.getStatsService = exports.saveDataService = exports.checkSequenceService = void 0;
const sequence_model_1 = require("../model/sequence.model");
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: "app-adn: service" });
// Verifica la secuencia dna para encontrar patron
const checkSequenceService = (sequence) => {
    let ismutant = false;
    let seq = 0;
    let pattern = ["A", "T", "C", "G"];
    // Verificacion horizontal
    for (let i = 0; i < sequence.length; i++) {
        let checkRow = sequence[i];
        for (const j in pattern) {
            if (checkRow.includes(pattern[j].repeat(4))) {
                ismutant = true;
                log.info("Secuencia mutante horizontal encontrada en: " + checkRow);
            }
        }
    }
    // Verificacion vertical
    //let matrix = getMatrix(sequence);
    for (let i = 0; i < sequence.length; i++) {
        let strVertical = "";
        for (let j = 0; j < sequence[i].length; j++) {
            strVertical = strVertical + sequence[j][i];
        }
        for (const j in pattern) {
            if (strVertical.includes(pattern[j].repeat(4))) {
                ismutant = true;
                log.info("Secuencia mutante vertical encontrada en: " + strVertical);
            }
        }
    }
    return ismutant;
};
exports.checkSequenceService = checkSequenceService;
// Save to dabatabase
const saveDataService = (sequence, isMutant) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new sequence_model_1.Sequence({
            sequence,
            isMutant,
        }).save();
    }
    catch (error) {
        log.error(error);
    }
});
exports.saveDataService = saveDataService;
const getStatsService = () => __awaiter(void 0, void 0, void 0, function* () {
    let count_mutant_dna = 0;
    let count_human_dna = 0;
    let ratio = 0;
    let res = {
        count_mutant_dna,
        count_human_dna,
        ratio
    };
    let sequences = yield sequence_model_1.Sequence.find({});
    sequences.forEach((seq) => {
        if (JSON.parse(JSON.stringify(seq)).isMutant) {
            count_mutant_dna++;
        }
        else if (!JSON.parse(JSON.stringify(seq)).isMutant) {
            count_human_dna++;
        }
    });
    res.count_human_dna = count_human_dna;
    res.count_mutant_dna = count_mutant_dna;
    if (count_human_dna > 0) {
        res.ratio = Math.round(count_mutant_dna / count_human_dna);
    }
    else {
        res.ratio = 0;
    }
    return res;
});
exports.getStatsService = getStatsService;
/*
const getMatrix = (sequence: Array<String>) => {
  let matrix = new Array(6);
  for (var i = 0; i < 6; i++) {
    matrix[i] = new Array(2);
  }
  for (let i = 0; i < sequence.length; i++) {
    let checkRow = sequence[i];
    for (let j = 0; j < checkRow.length; j++) {
      matrix[i][j] = checkRow[j];
    }
  }
  return matrix;
};*/
