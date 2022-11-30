import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

const RouterLayout: React.FC<{}> = () => {
    return(
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default RouterLayout;