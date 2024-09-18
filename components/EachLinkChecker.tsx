import React from "react";
import useSWR from "swr";
import { Chip, Spinner } from "@nextui-org/react";

export interface EachLinkCheckerProps {
  className?: string;
  endPoint: string;
  onStatusChange: (status: "success" | "danger") => void;
  onCall: (endPoint: string) => void; // Update this signature
}

const fetcher = (url: string) =>
  fetch(url).then((res) => res.status >= 200 && res.status < 400);

const EachLinkChecker: React.FC<EachLinkCheckerProps> = ({
  className,
  endPoint,
  onStatusChange,
  onCall,
}) => {
  const { data, error } = useSWR(endPoint, fetcher);

  React.useEffect(() => {
    if (error || data === false) {
      onStatusChange("danger");
    } else if (data === true) {
      onStatusChange("success");
    }
  }, [data, error, onStatusChange]);

  // Call the onCall function with the endPoint value
  React.useEffect(() => {
    onCall(endPoint);
  }, [endPoint, onCall]); // Ensure this is called when endPoint changes

  if (data === null && !error) {
    return (
      <Chip size="lg" color="default">
        <Spinner />
      </Chip>
    );
  }

  if (error) {
    return (
      <Chip size="lg" color="danger">
        Broken
      </Chip>
    );
  }

  return (
    <div className={className}>
      {data ? (
        <Chip size="lg" color="success" isCloseable>
          Working
        </Chip>
      ) : (
        <Chip size="lg" color="danger">
          Broken
        </Chip>
      )}
    </div>
  );
};

export default EachLinkChecker;
