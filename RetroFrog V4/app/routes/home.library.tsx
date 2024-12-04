import { Outlet } from "@remix-run/react";
import Gallery from "./home.library.gallery";

export default function Library(){
    return (
    <div className="content">
        <Gallery/>
    </div>
    );
}