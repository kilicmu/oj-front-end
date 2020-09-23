
function isEmail(email: string) {
  const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return mailReg.test(email);
}

export { isEmail };

