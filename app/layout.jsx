import Footer from "@/app/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Donkey Ranking",
  description: ""
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
