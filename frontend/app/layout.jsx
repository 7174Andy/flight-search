import "../styles/global.css";

export const metadata = {
  title: "Flight Search",
  description: "Flight Search WebsiteGenerated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
