"use client";

import { menus } from "@/constant/menu";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function MenuMobile() {
    return (
        <>
            <Menu as="div" className="relative">
                <MenuButton aria-label="Menu" className="text-white/50 p-3 border border-zinc-300/50 focus:border-zinc-300 hover:border-zinc-300 rounded-md focus:text-white hover:text-white cursor-pointer focus-visible:outline-0">
                    <Bars3Icon className="h-4" />
                </MenuButton>
                <MenuItems
                    anchor="bottom"
                    className="w-3/4 rounded-xl border border-black/5 bg-zinc-700 p-1 mt-2 text-sm/6 text-white transition duration-100 ease-out focus:outline-none z-10"
                >
                    <MenuItem disabled>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                            Menu
                        </button>
                    </MenuItem>
                    <div className="my-1 h-px bg-white/5" />
                    {menus.length > 0 && 
                        menus.map((menu, i) => (
                            <MenuItem key={i}>
                                <Link href={menu.link} aria-label={menu.title} title={menu.title} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                                    {menu.name}
                                </Link>
                            </MenuItem>
                        ))
                    }
                </MenuItems>
            </Menu>
        </>
    )
}