import { Input, Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import React, { useState } from "react";
import LinksLogo from "@/components/Logos/Links";
import GlassLogo from "@/components/Logos/Glass";
import useSWRMutation from "swr/mutation";

// interface LinkStatus {
//   url: string;
//   status: "loading" | "success" | "broken";
// }

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  const data = await response.json();
  return data;
};

export default function Home() {
  const [isLoading, setIsLoding] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteUrls, setWebsiteUrls] = useState<string[]>([]);
  // const [linkStatuses, setLinkStatuses] = useState<LinkStatus[]>([]);
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const { trigger: fetchEndpointsTrigger } = useSWRMutation<string[]>(
    `/api/links?url=${encodeURIComponent(websiteUrl)}`,
    fetcher
  );

  const submitHandler = async () => {
    setIsLoding(true);
    setError(null); // Reset error state

    try {
      const urls = await fetchEndpointsTrigger();
      console.log("urls:", urls);
      setWebsiteUrls(urls);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message); // Set error message
      console.error("Error:", error.message);
    } finally {
      setIsLoding(false);
    }
  };

  const handleInputValueChange = (value: string) => {
    setWebsiteUrl(value);
    setError(null);
  };

  return (
    <>
      <div className="heading--block">
        <h1 className="pt-6 pb-12 capitalize text-3xl xl:text-5xl 2xl:text-7xl text-center font-bold text-green-500">
          Check the <span className="text-red-600">Broken </span>Links of Your
          <span className="text-blue-600"> website</span>
        </h1>
      </div>
      <div className="input--block px-6">
        <Card className="">
          <CardHeader className="flex !justify-center">
            Your Website URL
          </CardHeader>
          <CardBody className="!justify-center place-items-center gap-4 !text-center py-4">
            <Input
              type="email"
              size="lg"
              label="Website URL"
              placeholder="Enter the url of your website here (eg: https://your-domain.com)"
              className="w-full max-w-screen-sm pb-2"
              startContent={<GlassLogo />}
              isDisabled={isLoading}
              endContent={<LinksLogo />}
              onValueChange={handleInputValueChange}
            />
            <Button
              color="success"
              size="md"
              variant="solid"
              isLoading={isLoading}
              spinnerPlacement="end"
              onPress={submitHandler}
            >
              Submit
            </Button>
            {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
            {websiteUrls.length < 1 && (
              <div className="text-red-500 mt-2">No urls found.</div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
