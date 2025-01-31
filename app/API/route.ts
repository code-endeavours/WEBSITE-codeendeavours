import { NextResponse } from "next/server";

const INSTAGRAM_API_URL = "https://graph.instagram.com/me";

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Instagram access token not found" },
      { status: 500 }
    );
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

    const profileData = await profileResponse.json();
    const mediaData = await mediaResponse.json();

    return NextResponse.json({
      profile: profileData,
      media: mediaData.data,
    });
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram data" },
      { status: 500 }
    );
  }
}
