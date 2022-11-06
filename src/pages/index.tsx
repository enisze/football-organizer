import { Link } from "@mui/joy";
import { CssVarsProvider, StyledEngineProvider } from "@mui/joy/styles";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Dashboard } from "../components/Dashboard";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.event.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Football Organizer</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Football <span className="text-purple-300">Organizer</span> App
        </h1>
        <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3"></div>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  const { data: link } = trpc.gmail.test.useQuery();

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <div className="flex flex-col items-center justify-center gap-2">
          {sessionData && (
            <p className="text-2xl text-blue-500">
              Logged in as {sessionData?.user?.name}
            </p>
          )}
          {secretMessage && (
            <p className="text-2xl text-blue-500">{secretMessage}</p>
          )}
          <button
            className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
          {sessionData && <Dashboard />}
          <Link href={link}>Authorize gmail</Link>
          <div>{link}</div>
        </div>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};
