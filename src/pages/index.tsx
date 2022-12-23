import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { LoginForm } from "../components/Authentication/LoginForm";
import { SignInAndSignOutButton } from "../components/Authentication/SignInAndSignOutButton";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Heading } from "../components/Heading";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { Navbar } from "../components/Navigation/Navbar";
import { useWindowSize } from "../hooks/useWindowSize";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  const { width } = useWindowSize();

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(to bottom, #373B44, #73C8A9)",
        }}
        className="fixed -z-10 flex h-full w-full"
      />
      <Head>
        <title>Football Organizer</title>
        <link rel="icon" href="/favicon.ico?v=2" />
        <meta
          name="googlebot"
          content="A simple football organizer showing payments based on emails"
        />
        <meta
          name="robots"
          content="A simple football organizer showing payments based on emails"
        />
      </Head>

      <LoadingWrapper isLoading={status === "loading"} center>
        {!sessionData ? (
          <main className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2">
            <Heading size={width && width < 720 ? "md" : "lg"} />
            <LoginForm />
            <SignInAndSignOutButton />
          </main>
        ) : (
          <div className="flex flex-col pb-2">
            <Navbar />
            <div className="p-8" />
            <Dashboard />
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};

export default Home;
