const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const credential = new DefaultAzureCredential();
const vault = "firstyearvault";

const url = `https://${vault}.vault.azure.net`;
const client = new SecretClient(url, credential);

const vaultUtility = async () => {
  try {
    const database = await client.getSecret('firstyeardb');
    const username = await client.getSecret('firstyearuser');
    const password = await client.getSecret('firstyearpassword');

    return {
      development: {
        username: username.value,
        password: password.value,
        database: database.value,
        host: "firstyearpsql.postgres.database.azure.com",
        dialect: 'postgres',
        encrypt: 'true',
        ssl: true,
        "dialectOptions": {
          "ssl": {
            "require": true
          }
        }
      },
      test: {
        username: username.value,
        password: password.value,
        database: database.value,
        host: "firstyearpsql.postgres.database.azure.com",
        dialect: 'postgres',
        encrypt: 'true',
        ssl: true,
        "dialectOptions": {
          "ssl": {
            "require": true
          }
        }
      },      
      production: {
        username: username.value,
        password: password.value,
        database: database.value,
        host: "firstyearpsql.postgres.database.azure.com",
        dialect: 'postgres',
        encrypt: 'true',
        ssl: true,
        "dialectOptions": {
          "ssl": {
            "require": true
          }
        }
      },
    };
  } catch (err) {
    console.log(err);
  }
};
(async ()=>{
  const test = await vaultUtility();
  console.log(test);
})() 
module.exports = vaultUtility;
