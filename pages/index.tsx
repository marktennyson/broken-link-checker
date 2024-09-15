import { useState } from "react";
import Header from "@/components/Header";

interface LinkStatus {
  url: string;
  status: "loading" | "success" | "broken";
}

export default function Home() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkStatuses, setLinkStatuses] = useState<LinkStatus[]>([]);

  const handleCheckLinks = async () => {
    if (!websiteUrl) return;

    try {
      // Fetch all links from the provided website URL
      const response = await fetch(
        `/api/links?url=${encodeURIComponent(websiteUrl)}`
      );
      const data: string[] = await response.json();
      setLinkStatuses(data.map((link) => ({ url: link, status: "loading" })));

      // Check the status of each link
      data.forEach(async (link, index) => {
        try {
          const linkResponse = await fetch(link);
          setLinkStatuses((prevStatuses) => {
            const updatedStatuses = [...prevStatuses];
            updatedStatuses[index].status = linkResponse.ok
              ? "success"
              : "broken";
            return updatedStatuses;
          });
        } catch {
          setLinkStatuses((prevStatuses) => {
            const updatedStatuses = [...prevStatuses];
            updatedStatuses[index].status = "broken";
            return updatedStatuses;
          });
        }
      });
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  return (
    <>
      <h1>Broken Link Checker</h1>
    </>
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   <h1 className="text-3xl font-bold mb-6">Broken Link Checker</h1>

    //   <input
    //     type="text"
    //     placeholder="Enter website URL"
    //     className="p-2 border border-gray-300 rounded-md w-1/2 mb-4"
    //     value={websiteUrl}
    //     onChange={(e) => setWebsiteUrl(e.target.value)}
    //   />

    //   <button
    //     onClick={handleCheckLinks}
    //     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    //   >
    //     Check Links
    //   </button>

    //   <div className="mt-6 w-1/2">
    //     {linkStatuses.map((linkStatus, index) => (
    //       <div key={index} className="flex justify-between items-center mb-2">
    //         <a
    //           href={linkStatus.url}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-blue-500"
    //         >
    //           {linkStatus.url}
    //         </a>
    //         <span
    //           className={`px-2 py-1 rounded-md ${
    //             linkStatus.status === "success"
    //               ? "bg-green-500 text-white"
    //               : linkStatus.status === "broken"
    //               ? "bg-red-500 text-white"
    //               : "bg-gray-500 text-white"
    //           }`}
    //         >
    //           {linkStatus.status}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
