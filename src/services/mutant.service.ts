import { Sequence } from "../model/sequence.model";
import { Logger } from "tslog";

const log = new Logger({ name: "app-adn: service" });

// Verifica la secuencia dna para encontrar patron
export const checkSequenceService = (sequence: Array<String>) => {
    let ismutant: boolean = false
    let seq = 0;
    let pattern = ["A", "T", "C", "G"]

     // Secuencia horizontal
    for (let i = 0; i < sequence.length; i++) {
        let checkRow = sequence[i];
        for (const j in pattern) {
            if (checkRow.includes(pattern[j].repeat(4)) ) {
                ismutant = true
                log.info('Secuencia encontrada en: '+checkRow)
            }
        }
      }

       // Secuencia vertical
    let matrix = getMatrix(sequence)
  
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
  let res = {
    count_mutant_dna,
    count_human_dna,
  };
  let sequences = await Sequence.find({});
  sequences.forEach((seq) => {
    if (JSON.parse(JSON.stringify(seq)).isMutant) {
      count_mutant_dna = count_human_dna + 1;
    } else if (!JSON.parse(JSON.stringify(seq)).isMutant) {
      count_human_dna = count_human_dna + 1;
    }
  });

  res.count_human_dna = count_human_dna;
  res.count_mutant_dna = count_mutant_dna;
  log.info("Stats api: ", res);

  return res;
};

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
};
