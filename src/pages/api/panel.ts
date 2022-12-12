import { type NextApiRequest, type NextApiResponse } from "next";
import { renderTrpcPanel } from "trpc-panel";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

import { appRouter } from "../../server/trpc/router/_app";

const TrpcPanel = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session?.user?.role !== "admin") return null;

  return res.send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/api/trpc",
      transformer: "superjson",
    })
  );
};

export default TrpcPanel;
