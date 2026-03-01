import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';
import './styles/terminal.css';

const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

export const metadata: Metadata = {
  title: 'Ajay Kumar | AI Developer Portfolio',
  description: 'Interactive Hacker-Themed Developer Portfolio of Ajay Kumar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable}`}>
      <body className="bg-black text-[#00ff00] font-mono selection:bg-[#00ff00] selection:text-black min-h-screen overflow-hidden">
        <div className="crt h-screen w-screen relative">
          <div className="scanline"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
