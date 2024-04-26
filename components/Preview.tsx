"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
  style?: string;
  truncate?: number;
}

const truncateString = (str: string, num: number) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const Preview = ({ value, style, truncate }: PreviewProps) => {
  console.log(truncate);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      className={style ? style : ""}
      theme="bubble"
      value={truncate ? truncateString(value, truncate) : value}
      readOnly
    />
  );
};

export default Preview;
