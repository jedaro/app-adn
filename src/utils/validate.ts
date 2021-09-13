import {Logger} from 'tslog'

const log = new Logger({name: 'app-adn: validate'})
/**
 *
 * @param sequence secuencia adn
 * @returns retorna true si la secuencia cumple con creterios para ser evaluada
 */
export const validateAdn = (sequence: Array<String>) => {
  let isValid = { message:"", valid:true };
  let pattern = ["A", "T", "C", "G"];
  
  if (sequence.toString() == "[]" || sequence.length == 0 || sequence.length > 6) {
    isValid.message = "Secuencia de dna vacia"
    isValid.valid = false;
    return isValid;
  } else {
    
    sequence.forEach((str) => {
      for (let i = 0; i < str.length; i++) {
        const character = str.charAt(i);
        if (!pattern.includes(character)) {
          log.error("La sequencia " +str +"no es valida. Solo debe contener los caractertes" +pattern);
          isValid.message = "La sequencia " +str+" no es valida. Solo debe contener los caractertes "+pattern
          isValid.valid = false;
        }
      }
    });
  }
  


  return isValid;
};
