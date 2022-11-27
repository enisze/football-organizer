import type { Provider } from "next-auth/providers";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";

function signin({ providers }: { providers: Provider }) {
  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default signin;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
