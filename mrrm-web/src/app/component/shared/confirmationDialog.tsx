import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";


function ConfirmationDialog(props: ConfirmParams) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props !== null && props.open !== null) {
            setOpen(props.open);
        }
    }, [props]);

    const hideDialog = () => {
        if (setOpen !== null && typeof setOpen === 'function') {
            setOpen(false);
        }
    };

    const confirmRequest = () => {
        if (props !== null && props.response !== null && typeof props.response === 'function') {
            props.response();
        }
        hideDialog();
    };

    if (props === null) {
        throw new Error('ConfirmationDialog props is null');
    }

    if (props.open === null) {
        throw new Error('ConfirmationDialog props.open is null');
    }

    if (props.title === null || props.title === undefined) {
        throw new Error('ConfirmationDialog props.title is null or undefined');
    }

    if (props.description === null || props.description === undefined) {
        throw new Error('ConfirmationDialog props.description is null or undefined');
    }

    if (props.response === null || props.response === undefined) {
        throw new Error('ConfirmationDialog props.response is null or undefined');
    }

    return (
        <Dialog
            open={open}
            onClose={hideDialog}
        >
            <DialogTitle >{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText >
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
    );
}

export default ConfirmationDialog;