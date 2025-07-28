import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="bg-[#002A5C] mt-5 mx-10 h-180 flex">
        <div className="w-4/10">
          <p className=" text-white text-6xl font-semibold">//Home page work in progress. Welcome to EWB Food Resource Hub</p>
        </div>
        <Image src="/UofT-White.png" alt="EWB logo" width={240} height={120} priority/>
      
      </div>

    </main>
  );
}
