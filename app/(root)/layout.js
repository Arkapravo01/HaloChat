import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import ToasterContext from "@components/ToasterContext";
import TopBar from "@components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Forumly Chat App",
  description: "Built by Arka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-blue-2 antialiased`}
      >

        <Provider>
          <TopBar/>
          <ToasterContext/>
          {children}
          </Provider>
        
      </body>
    </html>
  );
}
