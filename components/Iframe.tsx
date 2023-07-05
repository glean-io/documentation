"use client";

import React, { HTMLAttributes } from "react";

type IframeProps = { src: string } & HTMLAttributes<HTMLIFrameElement>;

export default function Iframe(props: IframeProps) {
  return (
    <iframe width="100%" height="500px" style={{ border: "none" }} {...props} />
  );
}
