import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import PrimaryLayout from "~/components/PrimaryLayout";
import { IBM_Plex_Sans } from '@next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
const ibmplexsans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400']
})
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <main className={ibmplexsans.className}>
          <PrimaryLayout>
            <ReactQueryDevtools initialIsOpen={true} />
            <Component {...pageProps} />
          </PrimaryLayout>
        </main>
      </SessionProvider>
    </ChakraProvider>

  );
};

export default api.withTRPC(MyApp);
