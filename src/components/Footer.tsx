import Link from "next/link"

export default function Footer(){
    return(
        <footer className="bg-[#002A5C] text-white py-6">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            
            <p className="text-sm">
              © {new Date().getFullYear()} UofT Food Resource Hub — Engineers Without Borders UofT Chapter
            </p>

            {/* Right: Links */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-orange-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-orange-400 transition-colors">
                Contact
              </Link>
              <a
                href="https://uoft.ewb.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
              >
                EWB UofT
              </a>
            </div>

          </div>
        </footer>
    );
}
