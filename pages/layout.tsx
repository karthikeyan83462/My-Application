import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Karthikeyan - Developer & Writer</title>
        <meta name="description" content="Personal developer blog and portfolio website of Karthikeyan, inspired by Josh W Comeau." />
      </Head>
      <body>
        <ThemeRegistry>
          <Header />
          <main style={{ minHeight: '80vh', paddingTop: '72px' }}>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
} 