import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut, LogOutIcon } from 'lucide-react'
import { UrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

//----------<Header /> should be written in PascalCase to correctly use the imported component.
const Header = () => {
    const navigate = useNavigate()

    const { user, fetchUser } = UrlState();
    const {loading, fn:fnLogout }= useFetch(logout);

  return (
    <nav
      className="p-4 hover:m-2 flex justify-between items-center
    bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-700
    shadow-lg
    border-b-2 border-black/30
    hover:shadow-[0_15px_15px_rgba(54,215,183,0.3)]
    transition-all duration-300  rounded-xl"
    >
      <Link to="/" className="hover:underline">
        <img
          src="/Logo.png"
          title="Go to landing page"
          className="h-16 rounded-xl hover:border border-cyan-400"
          alt="TrXmmr logo"
        />
      </Link>
      <div className="space-x-4">
        {!user ? (
          <Button
            className="rounded-xl bg-cyan-500 text-white shadow-slate-700 hover:shadow-xl hover:text-black transition-shadow"
            onClick={() => navigate("/auth")}
          >
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full overflow-hidden
    border-2 
    transform hover:scale-110 hover:border-[#36d7b7] 
    transition-all duration-300 ease-in-out
    hover:shadow-[0_0_15px_3px_rgba(54,215,183,0.6)]"
            >
              <Avatar>
                <AvatarImage
                  title="Avatar"
                  src={user?.user_metadata?.profile_pic}
                  className="object-cover border-[#36d7b7]"
                />
                <AvatarFallback className="bg-[#36d7b7]/10 text-[#36d7b7] font-semibold">
                  KK
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2  backdrop-blur-sm border-2 border-[#36d7b7]/50 rounded-xl shadow-lg shadow-[#36d7b7]/20">
              <DropdownMenuLabel className="font-semibold text-[#36d7b7] border-b border-[#36d7b7]/20 px-4">
                {user?.user_metadata?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#36d7b7]/20" />
              <DropdownMenuItem className="px-4 py-2 hover:bg-[#36d7b7]/10 focus:bg-[#36d7b7]/10 cursor-pointer transition-colors rounded-lg mx-1 my-1 focus:text-[#36d7b7]">
                <Link to="/dashboard" className="flex items-center w-full">
                  <LinkIcon className="mr-2 h-4 w-4 text-[#36d7b7]" />
                  <span>My Links</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=" px-4 py-2 hover:bg-red-50 focus:bg-red-50 cursor-pointer transition-colors rounded-lg mx-1 my-1 text-red-500 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </nav>
  );
}

export default Header