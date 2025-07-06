"use client";

import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import Logo from "./logo";
import { menus } from "@/constant/menu";
import SearchBox, { SearchBoxSkeleton } from "./search-box";
import Cart from "./cart";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "react-responsive";
import MenuMobile from "./menu-mobile";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const currentUrl = usePathname()
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
    })

    const opcloseMenu = () => {
        setOpenMobileMenu(!openMobileMenu)
    }
    
    useEffect(() => {
        setOpenMobileMenu(false)
    }, [isDesktopOrLaptop]);

    return (
        <>
            <nav className="relative flex items-center justify-between p-4 lg:px-6 w-full h-20">
                <div className={`items-center ${openMobileMenu ? "hidden" :"flex"}`}>
                    <Link
                        href="/"
                        prefetch={true}
                        className="hover:opacity-80 mr-5"
                    >
                        <Logo />
                    </Link>

                    {menus.length > 0 && (
                        <ul className="hidden gap-4 text-sm md:flex items-center">
                            {menus.map((menu, i) => {
                                const isCurrentUrl = currentUrl === menu.link;
                                
                                return (
                                    <li key={i}>
                                        <Link
                                            href={menu.link}
                                            title={menu.title}
                                            aria-label={menu.title}
                                            className={`text-emerald-600/50 hover:text-emerald-600 hover:underline underline-offset-4 hover:opacity-80 font-semibold uppercase ${isCurrentUrl ? "underline hover:no-underline" : ""}`}
                                        >
                                            {menu.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>


                <div className="justify-end flex w-1/3 gap-4">
                    {/* Menu Mobile */}
                    <div className={`${openMobileMenu ? "hidden" :"block"} flex-none md:hidden`}>
                        <Suspense fallback={null}>
                            <MenuMobile />
                        </Suspense>
                    </div>
                
                    <div className="justify-center hidden md:flex">
                        <Suspense fallback={<SearchBoxSkeleton/>}>
                            <SearchBox />
                        </Suspense>
                    </div>
                    <div className="md:hidden block">
                        <button className={`relative text-white/50 p-3 border border-zinc-300/50 focus:border-zinc-300 hover:border-zinc-300 rounded-md focus:text-white hover:text-white cursor-pointer ${openMobileMenu ? "hidden" :"flex"}`} onClick={opcloseMenu}>
                            <MagnifyingGlassIcon className="h-4" />
                        </button>
                    </div>
                    <div className={`${openMobileMenu ? "hidden" :"flex"} z-10`}>
                        <Suspense fallback={null}>
                            <Cart />
                        </Suspense>
                    </div>
                </div>

                <div className={`${openMobileMenu ? "block absolute" :"hidden"} justify-center flex  top-0 left-0 h-full w-full p-4 min-h-10`}>
                    <Suspense fallback={<SearchBoxSkeleton/>}>
                        <SearchBox actionCloseSearch={opcloseMenu} />
                    </Suspense>
                </div>
            </nav>
            <div onClick={opcloseMenu} className={`absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/10 h-screen ${openMobileMenu ? "block" :"hidden"}`}></div>
        </>
    )
}

export default Header;