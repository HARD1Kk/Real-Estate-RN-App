import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
    Account,
    Avatars,
    Client,
    Databases,
    OAuthProvider,
    Query,
} from "react-native-appwrite";

export const config = {
  Platform: "com.ReStateNet.com",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  database_Id: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE_ID,
};

export const appwriteClient = new Client();

if (!config.endpoint || !config.project) {
  throw new Error(
    "Appwrite endpoint or project ID is missing. Please check your environment variables."
  );
}

try {
  appwriteClient
    .setEndpoint(config.endpoint as string)
    .setProject(config.project as string)
    .setPlatform(config.Platform);
} catch (error) {
  console.error("Appwrite client initialization failed:", error);
  throw new Error("Failed to initialize Appwrite client");
}

export const avatar = new Avatars(appwriteClient);
export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);

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

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.database_Id!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return result.documents;
  } catch (error) {
    return [];
  }
}

export async function getProperties(params?: {
  filter?: string;
  query?: string;
  limit?: number;
}) {
  try {
    const filter = params?.filter ?? "";
    const query = params?.query ?? "";
    const limit = params?.limit;
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));
    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await databases.listDocuments(
      config.database_Id!,
      config.propertiesCollectionId!,
      buildQuery
    );
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}
