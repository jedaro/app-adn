import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { validateAdn } from "../utils/validate";
import { checkSequenceService, getStatsService, saveDataService } from "../services/mutant.service";

// Valida si una secuencia es valida y si es de un mutante
const isMutant = async (req: Request, res: Response, next: NextFunction) => {
  // Validate sequence
  let sequence = req.body;
  if (!validateAdn(sequence)) {

    res.status(400).json({
      code: 400,
      message: "Las secuencias de adn recibida no son validas",
    });
  }

 
  let isMutant = checkSequenceService(sequence);
  if (isMutant) {

    return res.status(200).json({
      message: "true",
    });
  } else {
    return res.status(403);
  }
};

// Retorna las estadisticas 
const getStats =  (req: Request, res: Response, next: NextFunction) => {
 
     getStatsService().then(data =>{
         res.status(200).json(data)
     })
};

export default {
  isMutant,
  getStats,
};
