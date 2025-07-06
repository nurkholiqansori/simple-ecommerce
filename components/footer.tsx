import { SITES_NAME } from "@/constant/site";
import React from "react";

const Footer: React.FC = () => (
    <>
    <div className="my-1 mx-auto h-px bg-white/25 mt-8 w-[80%] mb-16" />
    <footer className="text-zinc-50 text-center mt-2 md:mt-4 py-6 px-2">
        <p className="text-center">{SITES_NAME} created with ❤️</p>
    </footer>
    </>
);

export default Footer;