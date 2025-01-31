import { getInstagramProfileData } from "./API/route";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default async function Page() {
  let profile = [];
  let media = [];

  try {
    const data = await getInstagramProfileData(); // Fetch data from the service

    if (data.error) {
      throw new Error(data.error); // Handle error if the response contains an error message
    }

    profile = data.profile; // Access profile and media safely
    media = data.media;
  } catch (error) {
    console.error("Error loading Instagram data", error);
    // Handle error (e.g., fallback UI)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.username}
          </h1>
          <Button variant="outline">
            <Facebook className="mr-2 h-4 w-4" /> Follow
          </Button>
          <Button variant="outline">
            <Instagram className="mr-2 h-4 w-4" /> Follow
          </Button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {profile.username ? (
            <div className="px-4 py-6 sm:px-0">
              {/* Media Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {media.length > 0 ? (
                  media.map((post: any) => (
                    <div
                      key={post.id}
                      className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={post.media_url || "/placeholder.svg"}
                        alt={post.caption || "Instagram post"}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading Instagram data...</p>
          )}
        </div>
      </main>
    </div>
  );
}
