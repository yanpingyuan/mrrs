import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";


function ConfirmationDialog(props: ConfirmParams) {
    //local states
   
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);
    const showDialog = () => {
        setOpen(true);
    };

    const hideDialog = () => {
        setOpen(false);
    };

    const confirmRequest = () => {
        props.response();
        hideDialog();
    };

    return (
        <>
            {open && (
                <Dialog 
                    open={open}
                    onClose={hideDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {props.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={confirmRequest} color="primary">
                            Yes
                        </Button>
                        <Button onClick={hideDialog} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default ConfirmationDialog;