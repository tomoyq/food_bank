import { useState } from "react";

const useModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    //modalを閉じるときに一緒に実行したい関数があれば引数にもらう
    const handleClose = (func?: () => void) => {
        setOpen(false);
        
        if (func) {
            func()
        };
    };

    return {open, handleOpen, handleClose}
};

export default useModal