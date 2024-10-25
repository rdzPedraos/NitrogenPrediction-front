import { useState } from "react";

function useSideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return { isOpen, toggle, setIsOpen };
}

export default useSideBar;
