#!/usr/bin/env node

const simpleSecrets = require("./index")

const argv = require("yargs")
  .demandCommand(1)
  .strict()
  .help()
  .command("encrypt", "encrypt ./secrets.js file")
  .command("decrypt", "decrypt ./secrets.js.encrypted file")
  .command("print", "print contents of ./secrets.js to stdout")
  .command("export", "inject contents of ./secrets.js into process.env").argv;

const command = argv["_"][0];

(function main() {
  return {
    encrypt: simpleSecrets.encryptFile,
    decrypt: simpleSecrets.decryptFile,
    print: simpleSecrets.printEnvVars,
    export: simpleSecrets.writeToProcessEnv,
  }[command]();
})();
