import { Client, Account } from 'appwrite';

export const client = new Client();

let config = process.env;

client
    .setEndpoint(config.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(config.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export { ID } from 'appwrite';