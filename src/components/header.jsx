import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut, LogOutIcon } from 'lucide-react'

//----------<Header /> should be written in PascalCase to correctly use the imported component.
const Header = () => {
    const navigate = useNavigate()
const user = false;


  return (
    <nav className='py-4 flex justify-between items-center px-4 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 shadow-lg '>
        <Link to="/" className="hover:underline">
            <img src="/Logo.png" className="h-16 rounded-xl" alt="TrXmmr logo" />
        </Link>

        <div className="space-x-4">
            {!user ?
            <Button className='rounded-xl bg-cyan-500 text-white shadow-slate-700 hover:shadow-xl hover:text-black transition-shadow' onClick={()=> navigate("/auth")}>Login</Button>
            :
                (
                <DropdownMenu>
                    <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>KK</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuLabel>Kishan Kashyap</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LinkIcon  className='mr-2 h-4 w-4 '/>
                        My Links
                        </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">
                        <LogOut className='mr-2 h-4 w-45'/>
                          <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                )
            }
        </div>
    </nav>
 )
}

export default Header