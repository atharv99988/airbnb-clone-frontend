import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(params) {
    return (
        <div className="p-2 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}