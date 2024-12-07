import { Outlet } from "@remix-run/react";
import Gallery from "../components/Gallery";

export default function Library(){
    return (
    <div className="content">
        <Gallery/>
    </div>
    );
}