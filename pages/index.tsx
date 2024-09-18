import {
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import LinksLogo from "@/components/Logos/Links";
import GlassLogo from "@/components/Logos/Glass";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/Fetcher";
import dynamic from "next/dynamic";

const EachLinkChecker = dynamic(() => import("@/components/EachLinkChecker"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
  suspense: true,
});

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState<boolean>(true);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [checkedUrls, setCheckedUrls] = useState<string[]>([]);
  const [baseUrls, setBaseUrls] = useState<
    { url: string; parentUrl: string | null }[] | null
  >(null); // Updated to support url and parentUrl
  const [error, setError] = useState<string | null>(null);
  const [linkStatuses, setLinkStatuses] = useState<
    Record<string, "success" | "danger">
  >({}); // Map to hold the status of each URL

  const { trigger: fetchEndpointsTrigger } = useSWRMutation<
    { url: string; parentUrl: string | null }[]
  >(`/api/links?url=${encodeURIComponent(websiteUrl)}`, fetcher);

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const urls = await fetchEndpointsTrigger();
      setBaseUrls(urls);
      setLinkStatuses({}); // Reset statuses on new fetch
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const updateselCheckedUrls = (url: string) => {
    setCheckedUrls((prevUrls) => {
      if (!prevUrls.includes(url)) {
        return [...prevUrls, url];
      } else {
        return prevUrls;
      }
    });
  };

  useEffect(() => {
    console.log("baseUrls:", baseUrls?.length);
    console.log("checkedUrls:", checkedUrls.length);
    if (baseUrls && checkedUrls.length === baseUrls.length) {
      setIsSelectDisabled(false); // Enable the select dropdown
    }
  }, [checkedUrls, baseUrls]);

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
        {!isLoading && baseUrls?.length && (
          <div className="response--block mt-6">
            <div className="flex justify-end">
              <Select
                className="max-w-sm"
                label="Broken Filter"
                placeholder="Select your choice"
                size="sm"
                selectedKeys={["all"]}
                isDisabled={isSelectDisabled}
              >
                <SelectItem key={"all"}>All</SelectItem>
                <SelectItem key={"working"}>Working</SelectItem>
                <SelectItem key={"broken"}>Broken</SelectItem>
              </Select>
            </div>
            {baseUrls?.map((link, index) => (
              <Card key={index} className="mt-4">
                <CardBody
                  className={`flex-row justify-between place-items-center`}
                >
                  <div className="flex place-items-center gap-6">
                    <p>{index + 1}</p>
                    <div>
                      <strong>URL:</strong>{" "}
                      <Link
                        href={link.url}
                        isExternal
                        showAnchorIcon
                        color={linkStatuses[link.url]}
                        className="truncate"
                      >
                        {link.url}
                      </Link>
                      <br />
                      <strong>Parent URL:</strong> {link.parentUrl || "N/A"}
                    </div>
                  </div>
                  <EachLinkChecker
                    endPoint={link.url}
                    onStatusChange={(status) =>
                      handleStatusChange(link.url, status)
                    }
                    onCall={updateselCheckedUrls}
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
