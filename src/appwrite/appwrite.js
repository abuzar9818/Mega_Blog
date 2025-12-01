import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("691c7842003c1e5784ad");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };


