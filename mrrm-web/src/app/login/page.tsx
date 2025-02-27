import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, TextField } from "@mui/material";
import LoginForm from "../component/auth/login";
 
export default function Home() {
    // const { register, formState: { errors } } = useState();

    

    return (
        <div className="flex justify-center h-screen items-center">
          <LoginForm />
        </div>
       
            )
                 }
function useForm(): { register: any; handleSubmit: any; errors: any; } {
    throw new Error("Function not implemented.");
}

