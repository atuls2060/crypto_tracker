import React, { useContext } from 'react'
import { Avatar, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const ProfileDropDown = () => {
    const { name, isLoggedIn, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate();


    return <>
        {
            isLoggedIn ? < Menu>
                <MenuButton variant="outline">
                    <Avatar size="sm" name={name} />
                </MenuButton>
                <MenuList >
                    <MenuGroup title='Profile'>
                        <MenuItem onClick={() => navigate("/watchlist")}>Watchlist</MenuItem>
                        <MenuItem onClick={logoutUser}>Log Out</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                </MenuList>
            </Menu > :
                < Menu>
                    <MenuButton as={IconButton} icon={<AiOutlineUser />} variant="outline">
                    </MenuButton>
                    <MenuList >
                        <MenuGroup title='Profile'>
                            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                            <MenuItem onClick={() => navigate("/register")}>Signup</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                    </MenuList>
                </Menu >
        }
    </>
}

export default ProfileDropDown