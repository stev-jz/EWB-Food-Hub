
export default function Contact(){
    return (
        <section className="min-h-[80vh] w-full">
            <div className="mx-auto w-full max-w-[900px] px-5 sm:px-6 md:px-8 py-10">
                <h1 className="font-semibold tracking-tight text-[clamp(28px,6vw,48px)] text-center mb-4">
                    Content Suggestions
                </h1>
                <p className="text-lg text-center mb-2">
                    Submit recipes, recent food news, events, student discounts, and more!
                </p>
                <p className="text-center text-gray-600 mb-8">
                    All submissions will be reviewed and approved by the EWB team.
                </p>

                <form className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-black mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Type..."
                                className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-black mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Type..."
                                className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-black mb-2">Content Type</label>
                        <select className="w-full px-3 py-2 border-2 border-black bg-white text-black">
                            <option value="">Select...</option>
                            <option value="recipe">Recipe</option>
                            <option value="article">Article</option>
                            <option value="photos">Photos</option>
                            <option value="stories">Stories</option>
                            <option value="gardening">Gardening</option>
                            <option value="comments">Comments/Feedback</option>
                            <option value="resources">Resources</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-black mb-2">Upload File</label>
                        <input
                            type="file"
                            className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-black mb-2">Message</label>
                        <textarea
                            rows={6}
                            placeholder="Type..."
                            className="w-full px-3 py-2 border-2 border-black bg-white text-black resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-900 text-white font-medium border-2 border-blue-900"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}