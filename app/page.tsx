import Image from "next/image";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getInstagramData() {
  const res = await fetch("http://localhost:3000/api/instagram", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch Instagram data");
  }
  return res.json();
}

export default async function Page() {
  const { profile, media } = await getInstagramData();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.username}
          </h1>
          <Button variant="outline">
            <Instagram className="mr-2 h-4 w-4" /> Follow
          </Button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {profile.username}
                  </h2>
                  <p className="text-gray-600">
                    Exploring the world of code, one project at a time.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" /> San Francisco, CA
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-1" />{" "}
                      contact@codeendeavours.com
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="text-gray-900 font-semibold">
                      {profile.media_count} posts
                    </div>
                    <div className="text-gray-900 font-semibold">
                      {profile.username} followers
                    </div>
                    <div className="text-gray-900 font-semibold">
                      500 following
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {media.map((post: any) => (
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
