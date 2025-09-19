import * as Linking from "expo-linking";
import * as WebBrowser from 'expo-web-browser';
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

console.log(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

export const config = {
  Platform:"com.ReStateNet.com",
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

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to login");

    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (typeof browserResult !== 'object' || browserResult.type !== 'success') throw new Error("Failed to login");
    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function logout() {
  try {
    await account.deleteSessions();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response?.$id) {
      const userAvatar = avatar.getInitials(response.name || '');
      return {
        ...response,
        avatar: userAvatar.toString()
      };
    }
    return null;
  }
  catch(error){
    console.log(error);
    return null
    
  }
  }
