import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white py-8 lg:py-[30px] flex items-center justify-center">
      <div className="bg-[#002A5C] mx-4 lg:mx-auto lg:container flex flex-col lg:flex-row items-center px-6 lg:px-16 py-8 lg:py-16">
        
        <div className="flex-1 text-white space-y-6 text-center lg:text-left">
          <h1 className="text-2xl max-lg:text-3xl lg:text-6xl tracking-tight font-semibold leading-tight">
            Welcome to EWB <br /> Food Resource Hub
          </h1>
          <p className="text-orange-400 text-sm max-lg:text-base lg:text-xl">
            Discover the Best Food Resources for Students at UofT St. George!
          </p>
          <a
            href="/campusEats"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Explore Food
          </a>
        </div>

        <div className="flex-1 mt-8 lg:mt-0 lg:ml-12 w-full">
          <img
            src="/landing-image.jpg"
            alt="Students enjoying food"
            className="w-full rounded-lg object-cover"
          />
        </div>

      </div>
    </div>
  );
}
