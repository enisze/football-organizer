import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { AuthShowcase } from "../components/AuthShowCase";
import { Heading } from "../components/Heading";
import { LoginAndLogoutButton } from "../components/LoginAndLogoutButton";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(to top, #373B44, #73C8A9)",
        }}
        className="fixed -z-10 flex h-full w-full"
      />
      <Head>
        <title>Football Organizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!sessionData && (
        <main
          className="absolute top-1/2 left-1/2 flex h-full w-full flex-col items-center justify-center"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <Heading />
          <LoginAndLogoutButton />
        </main>
      )}
      {sessionData && <AuthShowcase />}
    </div>
  );
};

export default Home;
