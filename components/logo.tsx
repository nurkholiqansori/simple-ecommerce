import { SITES_NAME } from "@/constant/site";
import React from "react";

const Logo: React.FC = () => {
    return(
        <span className="font-bold md:text-2xl select-none">{SITES_NAME}</span>
    )
}

export default Logo;