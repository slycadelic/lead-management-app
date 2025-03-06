import "./globals.css";

export const metadata = {
  title: "Lead Management App",
  description: "A Simple Lead Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
