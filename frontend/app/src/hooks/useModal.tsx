import { useState } from "react";

type FridgeItem = {
    expiry_date: string;
    name: string;
    owner_name: string;
    quantity: number;
    id: number;
};

const useModal = () => {
    //modalの状態
    const [open, setOpen] = useState(false);
    
    //modalを開くときにMouseEventを渡して実行したい関数があれば引数にもらう
    const handleOpen = (func?: (content: FridgeItem) => Promise<void>, content?: FridgeItem) => {
        if (func && content) {
            func(content);
            setOpen(true);
        } else {
            setOpen(true);
        };
    };

    //modalを閉じるときに一緒に実行したい関数があれば引数にもらう
    const handleClose = (func?: () => void) => {
        setOpen(false);
        
        if (func) {
            func();
        };
    };

    return {open, handleOpen, handleClose}
};

export default useModal