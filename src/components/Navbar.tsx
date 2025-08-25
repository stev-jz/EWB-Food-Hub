'use client'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Campus Eats", href: "/campusEats" },
  { label: "Recipes", href: "/recipes" },
  { label: "News", href: "/news" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Nav(){
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    return(
      <nav className="bg-[#002A5C] font-source z-50 fixed w-full">
          <div className="w-full flex items-center h-20 md:h-28 lg:h-36 justify-between">
              <Link className="pt-3 px-4 md:px-12 lg:px-20 flex items-center" href="/">
                  <Image src="/EWB-White.png" alt="EWB logo" width={80} height={23} className="md:w-32 lg:w-40 xl:w-48" priority/>
                  <div className="w-[1px] md:w-[2px] h-10 md:h-16 lg:h-20 bg-gray-300 mx-2 md:mx-3 lg:mx-5"/>
                  <p className="tracking-tight text-lg md:text-2xl lg:text-3xl xl:text-[4.5vh] font-semibold text-white">UofT Food Resource Hub</p>
              </Link>
              <ul className="pt-3 pr-[7vw] hidden xl:flex flex-nowrap gap-[40px] min-w-max">
                  {navItems.map(({label, href}) => (
                      <li key={href} className="shrink-0">
                          <Link href={href} className={`whitespace-nowrap transition-colors duration-300 ${pathname === href ? 'text-orange-400':'text-white hover:text-orange-400'}  text-[18px]`}>{label}</Link>
                      </li>
                  ))}
              </ul>
              <button className=" hover:text-orange-400 cursor-pointer transition duration-300 mr-4 md:mr-8 lg:mr-10 size-10 md:size-12 lg:size-14 xl:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? (
                      <XMarkIcon/>
                  ) : (
                      <Bars3Icon/>
                  )}
              </button>
          </div>

        {isOpen && (
          <div className="border-t-2 border-white xl:hidden bg-[#002A5C] px-6 py-4">
            <ul className="flex flex-col gap-4">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block transition-colors duration-300 ${
                      pathname === href
                        ? "text-orange-400"
                        : "text-white hover:text-orange-400"
                    } text-[18px]`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

    )
}