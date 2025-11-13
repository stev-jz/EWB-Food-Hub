import MapView from "@/components/MapView";

export default function CampusEats(){
    
    return (
        <div className="pt-[4vh] min-h-[80vh] w-full flex justify-center">
            <div className="flex w-[90%] md:w-[80%] flex-col items-center">
                <p className="font-semibold text-[6vw] max-lg::text-[4vw] lg:text-[2.5vw]">
                  Food at UofT
                </p>

                <p className="pt-[1vh] font-extralight text-[3.5vw] max-lg:text-[2.2vw] lg:text-[1vw] tracking-wide text-center w-[90%] md:w-[80%]">
                  UofT offers a large range of food options. From dining halls to food courts to coffee spots, 
                  there is something for everyone.
                </p>
                <div className="w-full mt-6 rounded-lg overflow-hidden shadow-lg">
                    <MapView />
                </div>
            </div>
        </div>
    )
}
