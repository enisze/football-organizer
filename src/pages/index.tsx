import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { LoginAndLogoutButton as SignInAndLogoutButton } from "../components/Authentication/LoginAndLogoutButton";
import { LoginForm } from "../components/Authentication/LoginForm";
import { AuthShowcase } from "../components/AuthShowCase";
import { Heading } from "../components/Heading";
import { LoadingWrapper } from "../components/LoadingWrapper";

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
          <main className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2">
            <Heading />

            <LoginForm />

            <SignInAndLogoutButton />
          </main>
        ) : (
          <AuthShowcase />
        )}
      </LoadingWrapper>
    </div>
  );
};

export default Home;
