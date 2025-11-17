import './globals.css';
import { Manrope } from 'next/font/google';
import { Providers } from './providers';
import 'react-quill/dist/quill.snow.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Selekt',
  description: 'Your food delivery platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className} style={{ 
        backgroundColor: '#ffffff',
        margin: 0,
        minHeight: '100vh',
      }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
