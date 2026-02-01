
import Link from "next/link";

export default function Resources() {
    return (
        <section className="min-h-[80vh] w-full">
            <div className="mx-auto w-full max-w-[900px] px-5 sm:px-6 md:px-8 py-10">
                <h1 className="font-semibold tracking-tight text-[clamp(24px,6vw,44px)]">
                    Food Resources
                </h1>
                <p className="opacity-80 mt-1 text-sm sm:text-base mb-8">
                    Choose the type of resources you&apos;re looking for:
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Community Resources Card */}
                    <Link href="/resources/community" className="group">
                        <div className="bg-white border border-gray-200 rounded-lg p-8 transition-colors group-hover:border-orange-400">
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                                    <span className="text-2xl">🌍</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-400 transition-colors">
                                    Community-Wide Resources
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Food banks, government programs, and community organizations available throughout the Greater Toronto Area and Ontario.
                                </p>
                                <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-lg group-hover:bg-orange-500 transition-colors">
                                    Explore Community Resources →
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* UofT Resources Card */}
                    <Link href="/resources/uoft" className="group">
                        <div className="bg-white border border-gray-200 rounded-lg p-8 transition-colors group-hover:border-orange-400">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                    <span className="text-2xl">🏫</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-400 transition-colors">
                                    UofT Resources
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Campus dining services, student support programs, food banks, and resources specifically for University of Toronto students.
                                </p>
                                <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-lg group-hover:bg-orange-500 transition-colors">
                                    Explore UofT Resources →
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Need Help Choosing?</h3>
                    <p className="text-orange-800 text-sm">
                        If you&apos;re a UofT student, start with <strong>UofT Resources</strong> for campus-specific support.
                        For broader community support or if you need additional help, check out <strong>Community-Wide Resources</strong>.
                    </p>
                </div>
            </div>
        </section>
    )
}