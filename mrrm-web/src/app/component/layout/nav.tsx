
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import { Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";

import { cookies } from "next/headers";


export default async function Home() {
    //const [userInfo, setUserInfo] = useLocalStorage<UserInfo>("userInfo", {}  as UserInfo);
    const adminNavs=[{ text: "用户管理", url: "/dashboard/user" },
    { text: "会议室管理", url: "/dashboard/meetingRoom" }, 
    { text: "我的会议", url: "/dashboard/meetings" }, 
    { text: "个人信息", url: "/dashboard/user" }];
    const cookieStore = await cookies()
    const userStr = cookieStore.get('loginUser');
    const userInfo = JSON.parse(userStr?.value as string);
    const navs=[
    { text: "我的会议", url: "/dashboard/meetings" },
    { text: "个人信息", url: "/dashboard/user" }];
   
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <List className="h-full">
                {(userInfo && userInfo.IsAdmin?adminNavs:navs).map((link, index) => (
                    <ListItem key={link.text} disablePadding>
                        <Link href={link.url}  >
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={link.text} />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}