import { Client ,Account, Avatars, OAuthProvider } from "react-native-appwrite";
import * as Linking from 'expo-linking';


export const config = {
  Platform: "com.ReStateNet.com",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const appwriteClient = new Client();

appwriteClient
  .setEndpoint(config.endpoint!)
  .setProject(config.project!)
  .setPlatform(config.Platform!);

export const avatar = new Avatars(appwriteClient);
export const account = new Account(appwriteClient);


export async function login(){

    try {

      const redirectUri = Linking.createURL('/');
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,redirectUri);
     
        if(!response) throw new Error('Failed to login');
        
        const browserResult = await openAuthSessionAysync(
          response.toString(),
          redirectUri
        )


    }
     catch(error) {
      console.log(error);
      
     }
    catch(error){
        console.log(error);
        return false;
        
    }
}