import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="hidden md:flex px-6 py-4 flex-row justify-between items-center w-full h-16 bg-[#5A04FF] mt-3">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center  ">
        <img
          src="/assets/icons/output.png"
          width={170}
          height={36}
          className="mr-0 "
        />
      </Link>

      <Link
        to="/"
        className="flex items-center bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
        <span className="text-sm text-white">Dive into fresh content</span>
      </Link>

      {/* Center: Navigation Links */}
      <ul className="flex gap-6">
        {sidebarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;

          return (
            <li
              key={link.label}
              className={`group ${
                isActive ? "bg-primary-500 rounded-full" : ""
              }`}>
              <NavLink
                to={link.route}
                className="flex  bg-transparent border border-white/20 px-4 py-2 rounded-full relative gap-4 items-center p-2 text-white hover:text-black transition">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`h-6 w-6 group-hover:invert ${isActive ? "" : ""}`}
                />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Right: Profile & Logout */}
      <div className="flex gap-6 items-center  bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
        {isLoading || !user.email ? (
          <div className="h-10">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="hidden md:flex flex-col">
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-white text-sm">@{user.username}</p>
            </div>
          </Link>
        )}

        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={(e) => handleSignOut(e)}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="hidden lg:block text-white">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
