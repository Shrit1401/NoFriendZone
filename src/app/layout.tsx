import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/home/header";
import { PHProvider } from "@/providers/posthogprovider";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "NoFriendZone",
  description:
    "A fun game to see how long you can last without getting friendzoned by an AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PHProvider>
      <html lang="en" translate="no">
        <head>
          <script
            async
            src="https://cdn.seline.so/seline.js"
            data-token="c955847d0fd8810"
          ></script>

          <meta name="google" content="notranslate" />
        </head>
        <body className={`antialiased`}>
          <PostHogPageView />

          <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" />
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
          </div>
          <div className="relative h-full w-full bg-pink-100">
            <div className="absolute h-full w-full bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
          <Header />

          {children}
        </body>
      </html>
    </PHProvider>
  );
}
