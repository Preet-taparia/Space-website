import Head from "next/head";
import { Footer, Navbar } from "../components";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Comsmic Odyssy</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="bg-primary-black overflow-hidden">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  </>
);

export default MyApp;
