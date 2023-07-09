import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/></Head>
      <body className="h-full bg-white dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}