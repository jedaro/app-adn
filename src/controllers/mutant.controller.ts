import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { validateAdn } from "../utils/validate";
import {
  checkSequenceService,
  getStatsService,
  saveDataService,
  deleteSequences
} from "../services/mutant.service";

// Valida si una secuencia es valida y si es de un mutante
const isMutant = async (req: Request, res: Response, next: NextFunction) => {
  // Validate sequence
  let sequence = req.body.dna ? req.body.dna : "[]";
  let validation = validateAdn(sequence);
  
  if (!validation.valid) {
    res.status(400).json({
      code: 400,
      message: validation.message,
    });
  } else {
    let isMutant = checkSequenceService(sequence);
    if (isMutant) {
      saveDataService(sequence, true);
      return res.status(200).json({
        code: 200,
        message: "OK",
      }).end();
    } else {
      saveDataService(sequence, false);
      return res.status(403).json({
        code: 400,
        message: "Forbiden",
      }).end();
    }
  }


};

// Retorna las estadisticas
const getStats = (req: Request, res: Response, next: NextFunction) => {
  getStatsService().then((data) => {
    res.status(200).json(data);
  });
};

// Retorna las estadisticas
const destroy = (req: Request, res: Response, next: NextFunction) => {
  deleteSequences().then((data) => {
    if (data) {
      res.status(200).json({message: 'All Data successfully deleted'});
    } else {
      res.status(404).json({message: 'Error delete data'});
    }
    
  });
};

export default {
  isMutant,
  getStats,
  destroy
};
