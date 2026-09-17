import { chatGPTSignInPath, getChatGPTUser } from "./chatgpt-auth";
import PriceWatch from "./price-watch";
import { livePrices, sourceCoverage } from "./live-prices";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();
  return <PriceWatch user={user ? { name: user.displayName, email: user.email } : null} signInPath={chatGPTSignInPath("/")} prices={livePrices} coverage={sourceCoverage} isAdmin={user?.email === "secondinterests@gmail.com"} />;
}
