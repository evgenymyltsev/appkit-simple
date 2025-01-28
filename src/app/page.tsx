import { getSession } from "@/auth-lib";
import { IndexPage } from "./components/IndexPage";

const SimplePage: React.FC = async () => {
  const session = await getSession();

  return <IndexPage />;
};

export default SimplePage;

