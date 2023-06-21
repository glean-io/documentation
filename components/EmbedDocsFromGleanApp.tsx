import React, { useRef } from "react";
import { useEvent } from "react-use";

const GLEAN_APP_BASE_URL = process.env.NEXT_PUBLIC_GLEAN_APP_BASE_URL;

type EmbedDocsFromGleanAppProps = { path: string };
export default function EmbedDocsFromGleanApp({
  path
}: EmbedDocsFromGleanAppProps) {
  const docUrl = `${GLEAN_APP_BASE_URL}/dist/embed/embedDocs.html?${path}`;
  const iframe = useRef<HTMLIFrameElement | null>(null);

  useEvent("message", event => {
    if (event.origin !== GLEAN_APP_BASE_URL)
      return console.warn("Untrusted event", event);
    if (event.data?.type !== "gleanPublicEvent") return;
    if (!iframe.current) return;

    switch (event.data.name) {
      // Resize the iframe to fit the content without scrolling
      case "contentSize": {
        const size = event.data.size;
        iframe.current.style.height = `${size.height + 50}px`;
        break;
      }
      // Scroll the docs page in response to a scroll request from the iframe
      case "scrollRequest": {
        const offset = event.data.offset;
        offset.top = offset.top
          ? offset.top + iframe.current.getBoundingClientRect().top - 96
          : undefined;
        window.scrollTo({ ...offset, behavior: "smooth" });
        break;
      }
      default: {
        console.log("Unknown Glean event: ", event.data.name);
        break;
      }
    }
  });

  return (
    <iframe
      className="glean-docs"
      src={docUrl}
      scrolling="no"
      ref={iframe}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        overflow: "hidden"
      }}
    />
  );
}
