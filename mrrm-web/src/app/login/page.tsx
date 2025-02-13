import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import PersonIcon from '@mui/icons-material/Person';
import { Box } from "@mui/material";

 
export default function Home() {
    return (
        <div className="flex justify-center h-screen items-center">
            <Box>
            <Avatar sx={{ bgcolor: blue[500], width: 60, height: 60 }}>
                <PersonIcon />
            </Avatar>
            
            </Box>
        </div>
       
            )
                 }
