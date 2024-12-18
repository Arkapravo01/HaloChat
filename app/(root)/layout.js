import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import ToasterContext from "@components/ToasterContext";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Provider>
          <ToasterContext/>
          {children}
          </Provider>
        
      </body>
    </html>
  );
}
