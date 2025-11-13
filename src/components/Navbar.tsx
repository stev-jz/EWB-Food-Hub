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
  { 
    label: "Resources", 
    href: "/resources",
    dropdown: [
      { label: "Community-Wide Resources", href: "/resources/community" },
      { label: "UofT Resources", href: "/resources/uoft" }
    ]
  },
  { label: "Community Garden", href: "/communityGarden" },
  { label: "Contact", href: "/contact" },
];

export default function Nav(){
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const pathname = usePathname();
    return(
      <nav className="bg-[#002A5C] font-source z-50 fixed w-full">
          <div className="w-full flex items-center h-20 md:h-28 lg:h-36 justify-between">
              <Link className="pt-3 px-4 md:px-12 lg:px-20 flex items-center" href="/">
                  <Image src="/EWB-White.png" alt="EWB logo" width={80} height={23} className="md:w-32 lg:w-40 xl:w-48" priority/>
                  <div className="w-[1px] md:w-[2px] h-10 md:h-16 lg:h-20 bg-gray-300 mx-2 md:mx-3 lg:mx-5"/>
                  <p className="tracking-tight text-lg md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-white whitespace-nowrap">UofT Food Resource Hub</p>
              </Link>
              <ul className="pt-3 pr-[3vw] hidden xl:flex flex-nowrap gap-[25px] min-w-max">
                  {navItems.map((item) => (
                      <li 
                        key={item.href} 
                        className="shrink-0 relative"
                        onMouseEnter={() => item.dropdown && setDropdownOpen(item.label)}
                        onMouseLeave={() => setDropdownOpen(null)}
                      >
                          {item.dropdown ? (
                            <div className="relative">
                              <span className={`whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                                pathname.startsWith(item.href) ? 'text-orange-400' : 'text-white hover:text-orange-400'
                              } text-[16px]`}>
                                {item.label}
                              </span>
                              {dropdownOpen === item.label && (
                                <div className="absolute top-full left-0 bg-[#002A5C] border border-gray-600 py-2 min-w-[200px] z-50">
                                  {item.dropdown.map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.href}
                                      href={dropdownItem.href}
                                      className={`block px-4 py-2 text-sm transition-colors duration-300 ${
                                        pathname === dropdownItem.href 
                                          ? 'text-orange-400' 
                                          : 'text-white hover:text-orange-400'
                                      }`}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link href={item.href} className={`whitespace-nowrap transition-colors duration-300 ${
                              pathname === item.href ? 'text-orange-400' : 'text-white hover:text-orange-400'
                            } text-[16px]`}>
                              {item.label}
                            </Link>
                          )}
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
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.dropdown ? (
                    <div>
                      <span className={`block transition-colors duration-300 ${
                        pathname.startsWith(item.href) ? "text-orange-400" : "text-white"
                      } text-[16px] font-medium mb-3`}>
                        {item.label}
                      </span>
                      <div className="ml-2 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={`block px-3 py-2 transition-colors duration-300 border-l-3 ${
                              pathname === dropdownItem.href
                                ? "text-orange-400 border-orange-400 bg-orange-50/10"
                                : "text-gray-300 hover:text-orange-400 border-gray-600 hover:border-orange-400"
                            } text-[14px]`}
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-orange-400"
                          : "text-white hover:text-orange-400"
                      } text-[16px]`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

    )
}