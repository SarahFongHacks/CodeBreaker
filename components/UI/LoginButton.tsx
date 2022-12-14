import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { signout } from "../../auth/auth";
import { LoginContext } from "../../context";
import { auth } from "../../pages";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiGift, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoTicketSharp } from "react-icons/io5";
import { getUser } from "../../db_func/user";

const LoginButton = ({ color }) => {
  const { user, setUser, loading } = useContext(LoginContext);

  const getUserUpdated = async () => {
    if (user) {
      const updated = await getUser(user.id);
      setUser(updated);
    }
  };

  useEffect(() => {
    getUserUpdated();
  }, [loading]);
  const signOutHandler = (auth) => {
    signout(auth);
    setUser(undefined);
  };

  console.log((3.99999999).toFixed(2));

  return (
    <div className="select-none ">
      {user ? (
        <div className="h-12 flex space-x-4 ">
          <div className=" flex flex-row items-center justify-center space-x-2 rounded-lg bg-white/70 backdrop-blur-xl ring-1 truncate overflow-hidden py-3 px-5 ring-black/30 transition duration-200 ease-linear ">
            <IoTicketSharp />
            <p>{Math.floor(user.rewardPoints)}</p>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="select-none focus:outline-none">
              <div className="w-36 rounded-lg bg-white/70 backdrop-blur-xl  ring-1 truncate overflow-hidden py-3 px-5 ring-black/30 transition duration-200 ease-linear hover:ring-black cursor-pointer">
                {user.email}
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={10}
                alignOffset={0}
                collisionPadding={30}
                className=" bg-white shadow-2xl text-sm rounded-lg flex flex-col justify-center p-2"
              >
                <DropdownMenu.Item className="hover:outline-none hover:bg-black/10">
                  <Link href="/profile">
                    <div className="w-full text-black cursor-pointer px-4 py-3 flex flex-row items-center space-x-2">
                      <CgProfile />
                      <p>My profile</p>
                    </div>
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="w-full h-[1px] bg-black/10" />
                <DropdownMenu.Item className="hover:outline-none hover:bg-black/10">
                  <div
                    className="w-full text-black cursor-pointer px-4 py-3 flex flex-row items-center space-x-2"
                    onClick={() => signOutHandler(auth)}
                  >
                    <BiLogOut />
                    <p>Logout</p>
                  </div>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      ) : (
        <Link href="/login">
          <div className="h-12 flex flex-row">
            <div
              className={`${
                color === "white"
                  ? "ring-white/30 hover:ring-white text-white"
                  : "ring-black/30 hover:ring-black text-black"
              } "shadow-md cursor-pointer ring-1 transition ease-linear duration-200 rounded-md py-3 px-5 flex items-center justify-center"`}
            >
              Login
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
