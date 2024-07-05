import React, { useState, useEffect, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    function errorHandler(error: ErrorEvent) {
      console.error("Unhandled Error:", error);
      setHasError(true);
    }

    // 컴포넌트가 마운트될 때 에러 핸들러를 설정합니다.
    window.addEventListener("error", errorHandler);

    // 클린업 함수: 컴포넌트가 언마운트될 때 에러 핸들러를 제거합니다.
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return <div>죄송합니다, 예기치 않은 오류가 발생했습니다.</div>;
  }

  return <>{children}</>;
}

export default ErrorBoundary;
