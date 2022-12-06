import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { LoginForm } from "../components/Authentication/LoginForm";
import { SignInAndSignOutButton } from "../components/Authentication/SignInAndSignOutButton";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Heading } from "../components/Heading";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { UserInformation } from "../components/UserInformation";

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
            <Heading />
            <LoginForm />
            <SignInAndSignOutButton />
          </main>
        ) : (
          <div className="flex flex-col pb-2">
            <UserInformation />
            <Dashboard />
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};

export default Home;
