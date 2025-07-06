const generateAlphanumericCode = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};


//********************** Generate code based on length passed **********************//
const generateCode = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

const code = generateAlphanumericCode();
// console.log("Your code is:", code);

export { code, generateCode };