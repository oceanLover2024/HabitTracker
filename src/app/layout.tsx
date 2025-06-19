import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";
import Nav from "./components/nav/Nav";
import NProgressProvider from "./components/loading/TopLoader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NProgressProvider />
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
