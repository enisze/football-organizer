import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useWindowSize } from "../hooks/useWindowSize";

const DynamicBackground = dynamic(
  () =>
    import("../components/Animations/Background").then(
      (module) => module.Background
    ),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  const { width } = useWindowSize();

  return (
    <div>
      {/* <div
        style={{
          background: "linear-gradient(to bottom, #373B44, #73C8A9)",
        }}
        className="fixed -z-10 flex h-full w-full"
      /> */}
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
      <DynamicBackground />

      {/* <LoadingWrapper isLoading={status === "loading"} center>
        {!sessionData ? (
          <main className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2">
            <Heading size={width && width < 720 ? "md" : "lg"} />
            <LoginForm />
            <SignInAndSignOutButton />
          </main>
        ) : (
          <div className="flex flex-col pb-2">
            <Navbar />
            <div className="p-4" />
            <Dashboard />
          </div>
        )}
      </LoadingWrapper> */}
    </div>
  );
};

export default Home;
