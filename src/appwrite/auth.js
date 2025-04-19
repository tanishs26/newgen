import appwrite from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwrite.appwriteUrl)
      .setProject(appwrite.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.log("Create account error:", error);
    }
  }
  async login() {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Get current user error:", error);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout user error:", error);
    }
  }
}
const authService = new AuthService();
export default authService;
