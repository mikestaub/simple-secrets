
const path = require('path')
const encryptor = require("file-encryptor");

const FILE_NAME = "secrets.js";
const FILE_NAME_ENC = FILE_NAME + ".encrypted";

function getSecrets() {
  const secretsFile = path.resolve(process.cwd(), FILE_NAME)
  const allSecrets = require(secretsFile);
  return Object.keys(allSecrets).reduce((prev, next) => {
    prev[next] = allSecrets[next][process.env.NODE_ENV];
    return prev;
  }, {});
}

function writeToProcessEnv() {
  const secrets = getSecrets();
  for (const key in secrets) {
    process.env[key] = secrets[key];
  }
}

function printEnvVars() {
  const secrets = getSecrets();
  const envVarsString = Object.keys(secrets).reduce((acc, key) => {
    acc += key + "=" + secrets[key] + " ";
    return acc;
  }, "");
  console.log(envVarsString);
}

function encryptFile() {
  const key = _getEncryptionKey();
  encryptor.encryptFile(FILE_NAME, FILE_NAME_ENC, key, function(err) {
    if (err) {
      throw err;
    }
    console.log("Encrypted " + FILE_NAME);
  });
}

function decryptFile() {
  const key = _getEncryptionKey();
  encryptor.decryptFile(FILE_NAME_ENC, FILE_NAME, key, function(err) {
    if (err) {
      throw err;
    }
    console.log("Decrypted " + FILE_NAME_ENC);
  });
}

function _getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY env var must be set");
  }
  return key;
}

module.exports = {
  getSecrets,
  writeToProcessEnv,
  printEnvVars,
  encryptFile,
  decryptFile
}
