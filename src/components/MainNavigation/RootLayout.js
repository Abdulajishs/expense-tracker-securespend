import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const RootLayout = (props) => {
    return (
        <Fragment>
            <MainNavigation />
           <main>
           {props.children}
           </main>
        </Fragment>
    )
}

export default RootLayout;