import { getInstagramProfileData } from "./API/route";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram } from "lucide-react";
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
      <header className="bg-gray-100 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Text on the left side */}
          <h1 className="text-2xl font-bold text-blue-800">
            {profile.username.toUpperCase()}
          </h1>
          {/* Buttons on the right side */}
          <div className="flex space-x-1">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Instagram className="h-4 w-4" />
              </Button>
            </a>
            <Button variant="outline">
              <Facebook className="h-4 w-4" />
            </Button>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
      </header>
      {/* Main content */}
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
                        src={post.media_url}
                        alt={post.caption}
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
      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 text-sm text-gray-600 font-bold flex justify-center items-center">
        &copy; {new Date().getFullYear()} {profile.username}. All rights
        reserved.
      </footer>
    </div>
  );
}
