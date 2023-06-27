import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import PrimaryLayout from "~/components/PrimaryLayout";
import { ThemeProvider } from 'next-themes';
import { IBM_Plex_Sans } from '@next/font/google'
const ibmplexsans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400']
})
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider defaultTheme='light' enableSystem={true} attribute='class'>
      <SessionProvider session={session}>
        <main className={ibmplexsans.className}>
          <PrimaryLayout>
            <Component {...pageProps} />
          </PrimaryLayout>
        </main>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
