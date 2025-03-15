import Image from "next/image";
import TodoContainer from "./components/TodoContainer";
import { getUser } from "@/actions/auth/user.action";
import { DotLoader } from "react-spinners";

export default async function Home() {
  const user = await getUser({ serverComponent: true });

  return (
    <main>
      {user ? (
        <TodoContainer ownerUserId={user?.id} />
      ) : (
        <div>
          <div className="flex flex-col items-center mt-12">
            <DotLoader />
          </div>
          <div className="font-bold my-2">Please Login First</div>
        </div>
      )}
    </main>
  );
}
