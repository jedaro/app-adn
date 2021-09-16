import { Sequence } from "../model/sequence.model";
import { Logger } from "tslog";

const log = new Logger({ name: "app-adn: service" });

// Verifica la secuencia dna para encontrar patron
export const checkSequenceService = (sequence: Array<String>) => {
  let ismutant: boolean = false;
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

// Save to dabatabase
export const saveDataService = async (
  sequence: Array<String>,
  isMutant: boolean
) => {
  try {
    new Sequence({
      sequence,
      isMutant,
    }).save();
  } catch (error) {
    log.error(error);
  }
};

export const getStatsService = async () => {
  let count_mutant_dna = 0;
  let count_human_dna = 0;
  let ratio = 0;
  let res = {
    count_mutant_dna,
    count_human_dna,
    ratio
  };
  let sequences = await Sequence.find({});
  sequences.forEach((seq) => {
    if (JSON.parse(JSON.stringify(seq)).isMutant) {
      count_mutant_dna++;
    } else if (!JSON.parse(JSON.stringify(seq)).isMutant) {
      count_human_dna++;
    }
  });

  res.count_human_dna = count_human_dna;
  res.count_mutant_dna = count_mutant_dna;
  if (count_human_dna > 0) {
    res.ratio = (count_mutant_dna / count_human_dna)
  } else {
    res.ratio = 0
  }

  return res;
};
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
