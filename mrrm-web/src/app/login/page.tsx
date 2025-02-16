import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
 
export default function Home() {
    // const { register, formState: { errors } } = useState();

    

    return (
        <div className="flex justify-center h-screen items-center">
            <Box>
            <Avatar sx={{ bgcolor: blue[500], width: 60, height: 60 }}>
                <PersonIcon />
            </Avatar>

                <h1>Login</h1>
              {/* <Form> */}
                {/* <TextField   label="Email" variant="outlined" {...register('email', { required: true })}/>
                <TextField  label="Password" variant="outlined" {...register('password', { required: true })} />
                 */}  
                 
                <TextField label="Email" variant="outlined" />
                <TextField label="Password" variant="outlined" />

                   <Button>Button</Button>
                 
                    {/* </Form> */}
            </Box>
        </div>
       
            )
                 }
function useForm(): { register: any; handleSubmit: any; errors: any; } {
    throw new Error("Function not implemented.");
}

