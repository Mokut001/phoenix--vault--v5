
import './globals.css';
import { MeshProvider } from '@meshsdk/react';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MeshProvider>{children}</MeshProvider>
      </body>
    </html>
  );
}