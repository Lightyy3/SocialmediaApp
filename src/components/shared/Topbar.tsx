import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar bg-[#5A04FF] pb-2">
      {" "}
      {/* Reduce padding-bottom here */}
      <div className="flex-between px-2">
        <Link to="/" className="flex gap-1  items-center">
          <img src="/assets/icons/11.svg" alt="logo" width={100} height={1} />
        </Link>

        <div className="flex gap-2 items-center bg-transparent border border-white px-2 rounded-full relative">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              width={18}
              height={18}
            />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-1">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-5 w-5 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
