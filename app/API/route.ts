import { NextResponse } from "next/server";

// services/instagramService.ts
const INSTAGRAM_API_URL = "https://graph.instagram.com/me";

export async function getInstagramProfileData() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return { error: "Instagram access token not found" }; // Return the error directly
  }

  try {
    const [profileResponse, mediaResponse] = await Promise.all([
      fetch(
        `${INSTAGRAM_API_URL}?fields=id,username,account_type,media_count&access_token=${accessToken}`
      ),
      fetch(
        `${INSTAGRAM_API_URL}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`
      ),
    ]);

    if (!profileResponse.ok || !mediaResponse.ok) {
      throw new Error("Failed to fetch Instagram data");
    }

    const profileData = await profileResponse.json();
    const mediaData = await mediaResponse.json();

    return { profile: profileData, media: mediaData.data }; // Return the data directly
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return { error: "Failed to fetch Instagram data" }; // Return error if something goes wrong
  }
}
