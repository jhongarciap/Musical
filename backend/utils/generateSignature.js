// utils/generateSignature.js
const crypto = require('crypto');

const generateSignature = (params, apiSecret) => {
  // Asegúrate de incluir todos los parámetros necesarios, incluyendo el método
  const paramString = Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join('');
  
  const stringToHash = paramString + apiSecret;
  return crypto.createHash('md5').update(stringToHash).digest('hex');
};

module.exports = { generateSignature };
