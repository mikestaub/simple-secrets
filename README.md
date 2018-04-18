# simple-secrets

## Overview

This is a small, opinionated library for managing app secrets. The developer now must only manage a single, master key to access all sensitive data for the project.

For small to medium sized projects and teams, this approach should be sufficient. For a more robust / complex solution, something like HashiCorp Vault or AWS Secrets Manager should be used.

## Usage

### Storing secrets

1.  create a file called 'secrets.js' and have it export an object containing sensitive data in the following format:
```
module.exports = {
  API_KEY: {
    staging: "123",
    production: "345"
  }
}
```
2.  add the 'secrets.js' file to the project's .gitignore as to not accidentally commit it
3.  add the following script to the package.json:

```
"scripts": {
  "encrypt": "simple-secrets encrypt",
  "decrypt": "simple-secrets decrypt",
}
```

4.  run

```
export ENCRYPTION_KEY=some-secret-string
npm run encrypt
```

### Using secrets

1.  There must exist a file called 'secrets.js.encrypted' in the current working directory
2.  run

```
export ENCRYPTION_KEY=some-secret-string
npm run decrypt
```

It is assumed there exists a 'secrets.js.encrypted' file in the current working directory that can be or decrypted with the key specified by the 'ENCRYPTION_KEY' environment variable.

### Other commands

To print the secrets to stdout, use:
```
simple-secrets print
```
To inject the secrets into process.env use:
```
simple-secrets export
```


### Note

This approach assumes that the master encyption key is kept secret and safe. If it is ever made public, assume all credentials in secrets.js are compromised.
