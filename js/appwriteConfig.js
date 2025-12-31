const { Client, Account, Databases, ID, Query } = Appwrite;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68b17582003582da69c8');

const account = new Account(client);
const databases = new Databases(client);

// Database Config
const DATABASE_ID = '68b1b7590035346a3be9';
const CUSTOMER_TABLE = 'customer_tb';

const appwriteConfig = {
    client,
    account,
    databases,
    DATABASE_ID,
    CUSTOMER_TABLE
};
