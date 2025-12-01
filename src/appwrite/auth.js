import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return await this.login({ email, password });
            }
            return userAccount;
        } catch (err) {
            console.log("Appwrite service::createAccount:: error", err);
            throw err;
        }
    }

    async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
            console.log("Appwrite service::login:: error", err);
        throw err;
    }
}


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            // 401 errors are expected when there's no active session
            if (err.code !== 401) {
            console.log("Appwrite service::getCurrentUser:: error", err);
            }
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (err) {
            console.log("Appwrite service::logout:: error", err);
        }
    }
}

const authService = new AuthService();
export default authService;
