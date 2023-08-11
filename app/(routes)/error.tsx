"use client";

import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <p>{`${error.cause}`}</p>
      <p>{`${error.message}`}</p>
      <p>{`${error.name}`}</p>
      <p>{`${error.stack}`}</p>
    </>
  );
};

export default ErrorState;
