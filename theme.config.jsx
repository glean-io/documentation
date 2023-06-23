import Image from "next/image";
import { useConfig } from "nextra-theme-docs";

function analytics() {
  // abort if on server - can remove if we build statically
  if (typeof window === "undefined") return;
  (function () {
    // Create a queue, but don't obliterate an existing one!

    var analytics = (window.analytics = window.analytics || []);
    // If the real analytics.js is already on the page return.
    if (analytics.initialize) return;
    // If the snippet was invoked already show an error.
    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error("Segment snippet included twice.");
      }
      return;
    }
    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    analytics.invoked = true;
    // A list of the methods in Analytics.js to stub.
    analytics.methods = [
      "trackSubmit",
      "trackClick",
      "trackLink",
      "trackForm",
      "pageview",
      "identify",
      "reset",
      "group",
      "track",
      "ready",
      "alias",
      "debug",
      "page",
      "once",
      "off",
      "on",
      "addSourceMiddleware",
      "addIntegrationMiddleware",
      "setAnonymousId",
      "addDestinationMiddleware",
    ];
    // Define a factory to create stubs. These are placeholders
    // for methods in Analytics.js so that you never have to wait
    // for it to load to actually record data. The `method` is
    // stored as the first argument, so we can replay the data.
    analytics.factory = function (method) {
      return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        analytics.push(args);
        return analytics;
      };
    };
    // For each of our methods, generate a queueing stub.
    for (var i = 0; i < analytics.methods.length; i++) {
      var key = analytics.methods[i];
      analytics[key] = analytics.factory(key);
    }
    // Define a method to load Analytics.js from our CDN,
    // and that will be sure to only ever load it once.
    analytics.load = function (key, options) {
      // Create an async script element based on your key.
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
      // Insert our script next to the first script element.
      var first = document.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(script, first);
      analytics._loadOptions = options;
    };
    analytics._writeKey = process.env.SEGMENT_KEY;
    // Add a version to keep track of what's in the wild.
    analytics.SNIPPET_VERSION = "4.15.2";
    // Load Analytics.js with your key, which will automatically
    // load the tools you've enabled for your account. Boosh!
    analytics.load(process.env.SEGMENT_KEY);
    // Make the first page call to load the integrations. If
    // you'd like to manually name or tag the page, edit or
    // move this call however you'd like.
    analytics.page();
  })();

  /* Wait for html document to load */
  document.addEventListener("DOMContentLoaded", () => {
    let requestAccess = document.getElementById("request-access-button");
    analytics.trackLink(requestAccess, "request access link clicked");
  });
}

export default {
  logo: (
    <span>
      <Image
        src="/brand/glean-logo-light.png"
        alt="Glean logo"
        width={96}
        height={28}
      />
    </span>
  ),
  logoLink: "https://glean.io",
  useNextSeoProps: () => ({ titleTemplate: "Glean - %s" }),
  docsRepositoryBase:
    "https://github.com/glean-io/documentation/tree/main/",
  darkMode: false,
  nextThemes: { defaultTheme: 'light' },
  primaryHue: 38,
  sidebar: { defaultMenuCollapseLevel: 2, toggleButton: true },
  head: function useHead() {
    const { title } = useConfig();
    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Explore data with your team with Glean"
        />
        <meta
          name="og:description"
          content="Explore data with your team with Glean"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="glean.io" />
        <meta name="twitter:url" content="https://glean.io" />
        <meta name="og:title" content={title ? title + " – Glean" : "Glean"} />
        <meta name="apple-mobile-web-app-title" content="Glean" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon.png"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
      </>
    );
  },
  footer: {
    component: function useFooter() {
      <script> {analytics()} </script>;
    },
  },
  //banner: {
  //key: '2.0-release',
  //text: (
  //<a href="https://glean.io" target="_blank" rel="noreferrer">
  //🎉 Glean is released. Read more →
  //</a>
  //)
  //},
};
