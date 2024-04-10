import * as React from "react";
import { NavContext } from "./NavContext";

interface NavProviderProps {
    children: React.ReactNode;
}

export default function NavProvider({ children }: NavProviderProps) {
    const [showNav, setShowNav] = React.useState(
        () => !window.matchMedia("(max-width: 1000px)").matches
    );

    const handleShowNav = () => {
        setShowNav((state) => !state);
    };

    const memoizedValues = React.useMemo(
        () => ({
            showNav,
            handleShowNav,
        }),
        [showNav]
    );

    return (
        <NavContext.Provider value={memoizedValues}>
            {children}
        </NavContext.Provider>
    );
}
