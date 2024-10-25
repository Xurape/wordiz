import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/*eslint-disable-next-line @next/next/no-title-in-document-head*/}
          <title>Wordiz | Melhora o teu vocabulário em português!</title>
          <meta name="description" content="Com o Wordiz, podes melhorar o teu vocabulário de uma forma divertida!" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;