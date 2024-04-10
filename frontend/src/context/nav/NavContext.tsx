import * as React from "react";

export interface INavContext {
    showNav: boolean;
    handleShowNav: () => void;
}

export const NavContext = React.createContext<INavContext | null>(null);
