import React, { useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import useLogout from "../hooks/useLogout";
import { BellIcon, LogOutIcon, MessagesSquare } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatar } from "../lib/api";

const NavBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const [avatar, setavatar] = useState(authUser?.profilePic);
  const { logoutMutation } = useLogout();

  const queryClient = useQueryClient();

  const { mutate: updateAvatarMutation } = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (_, avatarUrl) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.setQueryData(["authUser"], (old) => ({
        ...old,
        profilePic: avatarUrl,
      }));
    },
  });

  const handleRandomAvatar = async () => {
    const idx = Math.floor(Math.random() * 1000) + 1;
    const randomAvatar = `https://robohash.org/${idx}.png?set=set4`;

    setavatar(randomAvatar);
    updateAvatarMutation(randomAvatar);
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 p-3.5">
      <div className="flex items-center w-full">
        {isChatPage && (
          <div className="flex items-center gap-2.5">
            <MessagesSquare className="size-7 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              <Link to="/">YooChat </Link>
            </span>
          </div>
        )}
        {!isChatPage && (
          <div className="flex items-center gap-2.5 lg:hidden">
            {" "}
            <MessagesSquare className="size-7 text-primary" />
            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              <Link to="/">YooChat</Link>
            </span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-4">
          <Link to="/notifications">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </Link>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={avatar}
                alt="User Avatar"
                onClick={handleRandomAvatar}
              />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
