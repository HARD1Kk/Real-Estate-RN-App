import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

console.log(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

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

export async function login() {
  try {
    // Check if environment variables are set
    if (!config.endpoint || !config.project) {
      throw new Error(
        "Appwrite configuration is missing. Please check your environment variables."
      );
    }

    // Check if user is already logged in
    try {
      const currentUser = await account.get();
      if (currentUser?.$id) {
        console.log("User already logged in:", currentUser.email);
        return { success: true, message: "Already logged in" }; // Already logged in, no need to login again
      }
    } catch (error) {
      // User not logged in, continue with OAuth flow
      console.log("No active session, proceeding with OAuth flow");
    }

    const redirectUri = Linking.createURL("/");
    console.log("Redirect URI:", redirectUri);

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to create OAuth2 token");

    console.log("OAuth2 token created, opening browser...");
    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (typeof browserResult !== "object" || browserResult.type !== "success") {
      throw new Error(`OAuth flow failed: ${browserResult.type}`);
    }

    const url = new URL(browserResult.url);
    console.log("Callback URL:", url.toString());

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    console.log("Login successful!");
    return { success: true, message: "Login successful" };
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
      // If user has uploaded avatar in prefs, use it
      let userAvatar = response.prefs?.avatar;

      // Otherwise, use initials avatar URL
      if (!userAvatar) {
        const initialsAvatar = avatar.getInitials({
          name: response.name || response.email || "User",
        });
        console.log("Initials avatar URL:", initialsAvatar.toString());
      }

      return {
        ...response,
        avatar: userAvatar,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
