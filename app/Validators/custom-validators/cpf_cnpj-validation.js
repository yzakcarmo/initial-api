const Validator = use("Validator");

const cpfFn = async (data, field, message, args, get) => {
  const value = get(data, field);

  if (!value) {
    return;
  }

  let cpf_cnpj = "";
  if (value.length == 18) cpf_cnpj = value.replace(/[^\d]+/g, "");
  else cpf_cnpj = value.replace(/\D/g, "");

  if (cpf_cnpj.length > 0 && cpf_cnpj.length === 11) {
    if (
      cpf_cnpj === "" ||
      cpf_cnpj.length !== 11 ||
      !/^\d{11}$/.test(cpf_cnpj)
    ) {
      throw message;
    }

    const digits = cpf_cnpj.split("").map((x) => parseInt(x));
    for (let j = 0; j < 2; j++) {
      let sum = 0;

      for (let i = 0; i < 9 + j; i++) {
        sum += digits[i] * (10 + j - i);
      }

      let checkDigit = 11 - (sum % 11);

      if (checkDigit === 10 || checkDigit === 11) {
        checkDigit = 0;
      }

      if (checkDigit !== digits[9 + j]) throw message;
    }
  } else {
    if (cpf_cnpj == "") throw message;

    if (cpf_cnpj.length != 14) throw message;

    if (
      cpf_cnpj == "00000000000000" ||
      cpf_cnpj == "11111111111111" ||
      cpf_cnpj == "22222222222222" ||
      cpf_cnpj == "33333333333333" ||
      cpf_cnpj == "44444444444444" ||
      cpf_cnpj == "55555555555555" ||
      cpf_cnpj == "66666666666666" ||
      cpf_cnpj == "77777777777777" ||
      cpf_cnpj == "88888888888888" ||
      cpf_cnpj == "99999999999999"
    )
      throw message;

    let tam = cpf_cnpj.length - 2;
    let num = cpf_cnpj.substring(0, tam);
    let digit = cpf_cnpj.substring(tam);
    let sum = 0;
    let pos = tam - 7;
    for (i = tam; i >= 1; i--) {
      sum += num.charAt(tam - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digit.charAt(0)) throw message;
    tam = tam + 1;
    num = cpf_cnpj.substring(0, tam);
    sum = 0;
    pos = tam - 7;

    for (i = tam; i >= 1; i--) {
      sum += num.charAt(tam - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digit.charAt(1)) throw message;
  }
};

Validator.extend("cpfCnpj", cpfFn);
