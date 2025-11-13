export default function About() {
    return (
        <div className="min-h-[80vh] w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Section 1: EWB & Community Projects - Image LEFT, Content RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16 mt-12">
                    <div className="order-2 lg:order-1">
                        <div className="w-full h-64 lg:h-80 flex items-center justify-center border-2 border-black">
                            <span className="text-black text-xl">Image</span>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-semibold mb-4">About EWB and Community Projects</h2>
                        <p className="text-lg leading-relaxed">
                            Engineers Without Borders (EWB) at the University of Toronto etc...<br />
                            etc...<br />
                            etc...<br />
                            etc...
                        </p>
                    </div>
                </div>

                {/* Section 2: Project Descriptions - Image RIGHT, Content LEFT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Our Projects</h2>
                        <p className="text-lg leading-relaxed">
                            Our projects include Campus Food Security, Community Garden, and Walkable Cities etc...<br />
                            etc...<br />
                            etc...<br />
                            etc...
                        </p>
                    </div>
                    <div>
                        <div className="w-full h-64 lg:h-80 flex items-center justify-center border-2 border-black">
                            <span className="text-black text-xl">Image</span>
                        </div>
                    </div>
                </div>

                {/* Section 3: CFS Research Team - Image LEFT, Content RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
                    <div className="order-2 lg:order-1">
                        <div className="w-full h-64 lg:h-80 flex items-center justify-center border-2 border-black">
                            <span className="text-black text-xl">Image</span>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-semibold mb-4">CFS Research Team</h2>
                        <p className="text-lg leading-relaxed">
                            Our Research Team is understanding and addressing food insecurity etc...<br />
                            etc...<br />
                            etc...<br />
                            etc...
                        </p>
                    </div>
                </div>

                {/* Section 4: Community Engagement - Image RIGHT, Content LEFT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Community Engagement</h2>
                        <p className="text-lg leading-relaxed">
                            We believe in the power of community and communication etc...<br />
                            etc...<br />
                            etc...<br />
                            etc...
                        </p>
                    </div>
                    <div>
                        <div className="w-full h-64 lg:h-80 flex items-center justify-center border-2 border-black">
                            <span className="text-black text-xl">Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
