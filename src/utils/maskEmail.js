const maskEmail = (email, maskChar = "*") => {
  const atIndex = email.indexOf("@");
  const domain = email.slice(atIndex);
  const username = email.slice(0, atIndex);
  const maskLength = Math.max(username.length - 2, 1);
  const mask = maskChar.repeat(maskLength);
  return `${username.slice(0, 1)}${mask}${username.slice(-1)}${domain}`;
};

export default maskEmail;
