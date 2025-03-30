import { useState } from "react";

type FridgeItem = {
    expiry_date: string;
    name: string;
    owner_name: string;
    quantity: number;
};

const useModal = () => {
    //modalの状態
    const [open, setOpen] = useState(false);
    
    //modalを開くときにMouseEventを渡して実行したい関数があれば引数にもらう
    const handleOpen = (func?: (content: FridgeItem, index: number) => Promise<void>, content?: FridgeItem, index?: number) => {
        if (func && content && index) {
            func(content, index);
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