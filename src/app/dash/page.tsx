import { getSession } from "@/auth-lib";
import { DashPage as Dash } from "../components/DashPage";
import { GoToLogin } from "../components/GoToLogin";

export default async function DashPage() {
  const session = await getSession();

  if (!session) {
    return <GoToLogin />;
  }

  return <Dash />;
}

