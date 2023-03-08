import { Layout, Text, Page } from "@vercel/examples-ui";
import Head from "next/head";
import { Chat } from "../components/Chat";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Head>
        <title>Let Me ChefGPT For You</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page className="flex max-w-5xl mx-auto flex-col gap-8 items-center justify-center py-2 min-h-screen">
        <section className="flex flex-col gap-6 text-center">
          <Text variant="h1">Let Me ChatGPT For You</Text>
          <Text className="text-zinc-600 text-center">
            Let Me ChatGPT For You is for all those people that find it more
            convenient to bother you with their questions than to ask ChatGPT
            for themselves. 😜
          </Text>
        </section>

        <section className="flex flex-col items-center ">
          <div className="">
            <Chat />
          </div>
        </section>
      </Page>
      <Footer />
    </>
  );
}

Home.Layout = Layout;

export default Home;
