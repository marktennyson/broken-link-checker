import React from "react";
import useSWR from "swr";
import { Chip, Spinner } from "@nextui-org/react";

export interface EachLinkCheckerProps {
  className?: string;
  endPoint: string;
  onStatusChange: (status: "success" | "danger") => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.ok);

const EachLinkChecker: React.FC<EachLinkCheckerProps> = ({
  className,
  endPoint,
  onStatusChange,
}) => {
  const { data, error } = useSWR(endPoint, fetcher);

  React.useEffect(() => {
    if (error || data === false) {
      onStatusChange("danger");
    } else if (data === true) {
      onStatusChange("success");
    }
  }, [data, error, onStatusChange]);

  if (!data && !error) {
    return (
      <Chip size="lg" color="default">
        <Spinner />
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
