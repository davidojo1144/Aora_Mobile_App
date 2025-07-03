import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: "https://nyc.cloud.appwrite.io/v1",
    platform: "com.optimize.aora",
    projectId: "6864b3a60035b37bde59",
    databaseId: "6864b791002c067359ba",
    userCollectionId: "6864b7e9002125075287",
    videoCollectionId: "6864b8370011c40ee5e1",
    storageId: "6864bc0c0015f1b5b54e"
};

const client = new Client();
client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const dataBase = new Databases(client);

export const createUser = async (email, password, userName) => {
  try {
    // Clear any existing sessions first
    try {
      await account.deleteSessions();
    } catch (e) {
      console.log("No active sessions to clear");
    }

    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        userName
    );

    if(!newAccount) throw new Error("Account creation failed");

    const avatarResult = avatars.getInitials(userName);
    const avatarUrl = typeof avatarResult === 'string' 
        ? avatarResult 
        : avatarResult.href || String(avatarResult);

    if (typeof avatarUrl !== 'string' || avatarUrl.length > 2000) {
        throw new Error("Invalid avatar URL format");
    }

    // Sign in after account creation
    const session = await signIn(email, password);

    const newUser = await dataBase.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            userName,
            avatar: avatarUrl
        }
    );

    return { user: newUser, session };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export async function signIn(email, password) {
    try {
        // Clear existing sessions before creating new one
        try {
            await account.deleteSessions();
        } catch (e) {
            console.log("No active sessions to delete", e);
        }

        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error("Sign in error:", error);
        throw error;
    }
}

// Add logout functionality
export async function signOut() {
    try {
        await account.deleteSessions();
        return true;
    } catch (error) {
        console.error("Sign out error:", error);
        throw error;
    }
}