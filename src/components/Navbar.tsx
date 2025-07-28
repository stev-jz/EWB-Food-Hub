'use client'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";


const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Campus Eats", href: "/campusEats" },
  { label: "Recipes", href: "/recipes" },
  { label: "News", href: "/news" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Nav(){
    const pathname = usePathname();
    return(
    
    <nav className="bg-[#002A5C] font-source">
        <div className="flex items-center h-35 w-full overflow-x-auto">
            <Link className="shrink-0 px-20 flex" href="/">
                <Image src="/UofT-White.png" alt="EWB logo" width={240} height={120} priority/>
                <div className="w-[2px] h-20 bg-gray-300 mx-5"></div>
                <Image src="/EWB-White.png" alt="EWB logo" width={160} height={46} priority/>
            </Link>
            <ul className="pr-20 flex flex-nowrap gap-[40px] min-w-max">
                {navItems.map(({label, href}) => (
                    <li key={href} className="shrink-0">
                        <Link href={href} className={`whitespace-nowrap transition-colors duration-300 ${pathname === href ? 'text-orange-400':'text-white hover:text-orange-400'}  text-[18px]`}>{label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>

    )
}