/**
 *
 * @param sequence secuencia adn
 * @returns retorna true si la secuencia cumple con creterios para ser evaluada
 */
export const validateAdn = (sequence: String[]) => {
  let isValid: boolean = true;
  let patter = ["A", "T", "C", "G"];

  if (sequence.length == 0 || sequence.length > 6) {
    isValid = false;
  }

  sequence.forEach((str) => {
    for (let i = 0; i < str.length; i++) {
      const character = str.charAt(i);
      if (!patter.includes(character)) {
        console.log("La sequencia " + str + " no es valida. Solo debe contener los caractertes "+patter);
        isValid = false;
      }
    }
  });

  return isValid;
};
