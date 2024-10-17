import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import theme from '@/styles/theme';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Incident Management SaaS</title>
        <meta name="description" content="Incident Management SaaS Application" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: theme.fonts.sans, backgroundColor: theme.colors.background }}>
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}