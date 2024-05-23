import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.aora.aora',
    projectId: '664726dc0017493d1612',
    databaseId: '66472799002e3f9e44c2',
    userCollectionId: '664727b60024ed897a88',
    videoCollectionId: '664727cd003aae67f431',
    storageId: '664728ca001b3f8b29be',
    locale: 'en'
}

const client = new Client()

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
export const createUser = async (email,password,username) => {
   try{
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email,password)

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }

    )
   }
   catch(e){
       console.log(e)
       throw new Error(e)
   }
}

export async function signIn(email,password){
    try{
        const session = await account.createEmailPasswordSession(email,password)
        return session
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get()
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]            
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0]
        return user
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}

export const getAllPosts = async () => {
    try{
        const post = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
        )
        return post.documents;
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}

export const getLatestPosts = async () => {
    try{
        const post = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return post.documents;
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}
