import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut, LogOutIcon } from 'lucide-react'

//----------<Header /> should be written in PascalCase to correctly use the imported component.
const Header = () => {
    const navigate = useNavigate()
const user = true;


  return (
    <nav className='py-4 flex justify-between items-center'>
        <Link to="/">
            <img src="/Logo.png" className="h-16" alt="TrXmmr logo" />
        </Link>

        <div>
            {!user ?
            <Button onClick={()=> navigate("/auth")}>Login</Button>
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
                        <LinkIcon  className='mr-2 h-4 w-4'/>
                        My Links
                        </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">
                        <LogOut className='mr-2 h-4 w-4'/>
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