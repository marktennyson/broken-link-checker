import {
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
  Link,
} from "@nextui-org/react";
import React, { useState, useCallback } from "react";
import LinksLogo from "@/components/Logos/Links";
import GlassLogo from "@/components/Logos/Glass";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/Fetcher";
import EachLinkChecker from "@/components/EachLinkChecker";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [baseUrls, setBaseUrls] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linkStatuses, setLinkStatuses] = useState<
    Record<string, "success" | "danger">
  >({}); // Map to hold the status of each URL

  const { trigger: fetchEndpointsTrigger } = useSWRMutation<string[]>(
    `/api/links?url=${encodeURIComponent(websiteUrl)}`,
    fetcher
  );

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const urls = await fetchEndpointsTrigger();
      console.log("urls:", urls);
      setBaseUrls(urls);
      setLinkStatuses({}); // Reset statuses on new fetch
    } catch (error: any) {
      setError(error.message);
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEndpointsTrigger]);

  const handleInputValueChange = useCallback((value: string) => {
    setWebsiteUrl(value);
    setError(null);
  }, []);

  const handleStatusChange = useCallback(
    (url: string, status: "success" | "danger") => {
      setLinkStatuses((prevStatuses) => ({
        ...prevStatuses,
        [url]: status,
      }));
    },
    []
  );

  return (
    <>
      <div className="heading--block">
        <h1 className="pt-6 pb-12 capitalize text-3xl xl:text-5xl 2xl:text-7xl text-center font-bold text-green-500">
          Check the <span className="text-red-600">Broken </span>Links of Your
          <span className="text-blue-600"> website</span>
        </h1>
      </div>
      <div className="input--block px-6">
        <Card>
          <CardHeader className="flex !justify-center">
            Your Website URL
          </CardHeader>
          <CardBody className="!justify-center place-items-center gap-4 !text-center py-4">
            <Input
              type="url"
              size="md"
              label="Website URL"
              placeholder="Enter the url of your website here (e.g., https://your-domain.com)"
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
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {baseUrls && baseUrls.length < 1 && (
              <div className="text-red-500 mt-2">No URLs found.</div>
            )}
          </CardBody>
        </Card>
        <div className="response--block mt-6">
          {baseUrls?.map((url) => (
            <Card key={url} className="mt-4">
              <CardBody className={`flex-row justify-between`}>
                <Link
                  href={url}
                  isExternal
                  showAnchorIcon
                  color={linkStatuses[url]}
                  className="truncate"
                >
                  {url}
                </Link>
                <EachLinkChecker
                  endPoint={url}
                  onStatusChange={(status) => handleStatusChange(url, status)}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
