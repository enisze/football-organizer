import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { AuthShowcase } from "../components/AuthShowCase";
import { Heading } from "../components/Heading";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { LoginAndLogoutButton } from "../components/LoginAndLogoutButton";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();
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
        <meta
          name="googlebot"
          content="A simple football organizer showing payments based on emails"
        />
        <meta
          name="robots"
          content="A simple football organizer showing payments based on emails"
        />
        <link rel="manifest" href="~/manifest.json" />
      </Head>

      <LoadingWrapper isLoading={status === "loading"} center>
        {!sessionData ? (
          <main
            className="absolute top-1/2 left-1/2 flex h-full w-full flex-col items-center justify-center"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Heading />
            <LoginAndLogoutButton />
          </main>
        ) : (
          <AuthShowcase />
        )}
      </LoadingWrapper>
    </div>
  );
};

export default Home;
