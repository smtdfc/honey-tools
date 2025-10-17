import type { Metadata } from "next";
import RootLayoutClient from "@/components/RootLayoutClient";
import Container from "@/components/Container";
import AppContainer from "@/components/AppContainer";
import prisma from "@/lib/prisma";

import "./globals.css";
import { Tool } from "@/entities/tool";

export const metadata: Metadata = {
  title: "Honey tools",
  description: "All tool in one place",
};

async function getGlobalTools(): Promise<Tool[]> {
  const tools = await prisma.tools.findMany();
  return tools;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tools = await getGlobalTools();
  console.log(tools);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className="dark-mode">
        <AppContainer tools={tools}>
          <Container>
            <RootLayoutClient />
            {children}
          </Container>
        </AppContainer>
      </body>
    </html>
  );
}
