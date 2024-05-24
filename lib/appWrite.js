import { Account, Avatars, Client, Databases, ID, Query ,Storage} from "react-native-appwrite"
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
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

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
        return newUser
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)        
        return session
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0]
     }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const getAllPosts = async () => {
    try {
        const post = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt')]

        )
        return post.documents;
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const getLatestPosts = async () => {
    try {
        const post = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return post.documents;
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const searchPosts = async (query) => {
    try {
        const post = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        )
        return post.documents;
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
export const getUserPosts = async (userId,setIsLoading) => {
    setIsLoading(true)
    try {
        const post = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return post.documents;
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
    finally{
        setIsLoading(false)
    }
   
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session

    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if(type === 'image'){
            fileUrl = storage.getFilePreview(config.storageId,fileId,2000,2000,'top',100)
        }
        else if(type === 'video'){
            fileUrl = storage.getFileView(config.storageId,fileId)
        }
        else{
            throw new Error('Invalid file type')
        }
        if(!fileUrl) throw new Error('File not found')

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const uplodFile = async (file, type) => {
    if(!file) return
    const {mimeType, ...rest } = file
    const asset = {
    name:file.fileName,
    type:file.mimeType,
    size:file.fileSize,
    uri:file.uri
    }
    try {
       const uploadedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        asset
       )
       const fileUrl = await getFilePreview(uploadedFile.$id,type);
       return fileUrl
    } catch (error) {
        throw new Error(error)
    }

}

export const createVideo = async (form) => {
    try {
        const [thumnailUrl, videoUrl] = await Promise.all([
            uplodFile(form.thumbnail, 'image'),
            uplodFile(form.video, 'video')
        ])
        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                thumbnail: thumnailUrl,
                video: videoUrl,
                creator: form.userId
            }
        )
    } catch (error) {
        throw new Error(error)
    }
}