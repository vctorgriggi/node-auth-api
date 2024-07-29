/* validates a Brazilian CPF number using the standard algorithm provided by the Brazilian Federal Revenue Service */
function validateIdentity(identity) {
  var Soma;
  var Resto;
  Soma = 0;
  if (identity === "00000000000") return false;

  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(identity.substring(i - 1, i)) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(identity.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(identity.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(identity.substring(10, 11))) return false;
  return true;
}

module.exports = validateIdentity;
