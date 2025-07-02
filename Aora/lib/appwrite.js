import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: "https://nyc.cloud.appwrite.io/v1",
    platform: "com.optimize.aora",
    projectId: "6864b3a60035b37bde59" ,
    databaseId: "6864b791002c067359ba",
    userCollectionId: "6864b7e9002125075287",
    videoCollectionId: "6864b8370011c40ee5e1",
    storageId: "6864bc0c0015f1b5b54e"
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 



const account = new Account(client);
const avatars = new Avatars(client)
const dataBase = new Databases(client)

export const createUser = async (email, password, userName) => {
  try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        userName
    )

    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(userName)

    await signIn(email, password)

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
    )

    return newUser
  } catch (error) {
    console.error("this is the error: ", error)
    throw new Error(error)
  }

}



export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}

