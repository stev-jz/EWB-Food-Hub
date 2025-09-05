'use client';
import { useMemo, useState } from 'react';

type Recipe = {
  id: string;
  title: string;
  url: string;
  image: React.ReactNode;
  time: string;

  minutes?: number;
  priceEstimate?: number;
  dietaryOptions?: string[];

  materialsList?: string;
  instructions?: string;
  dietaryInclusive?: string;
  difficulty?: string;
  price?: string;
  servings?: string;
};

const recipes: Recipe[] = [
  {
    id: "muffins",
    title: "Title",
    url: "link to recipe",
    image: <img src="/recipe-placeholder1.png" alt="muffins picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />,
    time: "Time: time",
    minutes: 25,
    priceEstimate: 7.5,
    dietaryOptions: ["vegan", "nut-free", "x"],
    materialsList: "x, y, z",
    instructions: "sentence here",
    difficulty: "difficulty",
    servings: "servings"
  },
  {
    id: "pasta",
    title: "Title",
    url: "link to recipe",
    image: <img src="/recipe-placeholder2.png" alt="pasta picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />,
    time: "Time: time",
    minutes: 20,
    priceEstimate: 6,
    dietaryOptions: ["vegan", "y"],
    materialsList: "x, y, z",
    instructions: "sentence here",
    difficulty: "difficulty",
    servings: "servings"
  },
  {
    id: "salad",
    title: "Title",
    url: "link to recipe",
    image: <img src="/recipe-placeholder3.png" alt="salad picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />,
    time: "Time: time",
    minutes: 10,
    priceEstimate: 3.5,
    dietaryOptions: ["nut-free", "z"],
    materialsList: "x, y, z",
    instructions: "sentence here",
    difficulty: "difficulty",
    servings: "servings"
  },
];

const ALL_DIETARY = ["vegan", "nut-free", "x", "y", "z"] as const;

export default function Recipes() {
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // button filter state
  const [priceFilter, setPriceFilter] = useState<"all" | "<20" | ">=20">("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "<30" | ">=30">("all");
  const [dietary, setDietary] = useState<Set<string>>(new Set());

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));
  const toggleDiet = (d: string) =>
    setDietary(prev => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });



  const norm = (s?: string) => (s || '').toLowerCase().trim();

  const filtered = useMemo(() => {
    const query = norm(q);
    return recipes.filter(r => {
      const haystack = [
        r.title, r.time, r.materialsList, r.instructions, r.dietaryInclusive,
        r.difficulty, r.price, r.servings, r.url
      ].map(norm).join(' | ');
      const textPass = query ? haystack.includes(query) : true;

      // price filter
      const pricePass =
        priceFilter === "all" ? true :
        r.priceEstimate == null ? true :
        priceFilter === "<20" ? r.priceEstimate < 20 : r.priceEstimate >= 20;

      // time filter
      const timePass =
        timeFilter === "all" ? true :
        r.minutes == null ? true :
        timeFilter === "<30" ? r.minutes < 30 : r.minutes >= 30;

      // dietary filter
      const dietPass =
        dietary.size === 0 ||
        (r.dietaryOptions && [...dietary].every(tag => r.dietaryOptions!.includes(tag)));

      return textPass && pricePass && timePass && dietPass;
    });
  }, [q, priceFilter, timeFilter, dietary]);

  return (
    <section className="min-h-[80vh] w-full">
      <div className="mx-auto w-full max-w-[760px] px-5 sm:px-6 md:px-8 py-10">
        <h1 className="font-semibold tracking-tight text-[clamp(24px,6vw,44px)]">
          Featured Recipes
        </h1>

        {/* Search */}
        <div className="mt-4">
          <input
            id="recipe-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full rounded-md border border-black/10 px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500/60"
          />
        </div>

        {/* Filters */}
        <div className="mt-3">
          <button
            onClick={() => setFiltersOpen(o => !o)}
            className="inline-flex items-center gap-2 text-sm sm:text-base underline-offset-4 hover:underline cursor-pointer"
          >
            Filters
            <svg className={`h-4 w-4 transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          <div
            className={`${filtersOpen ? 'block' : 'hidden'}`}
          >
            <div className="min-h-0 mt-3 space-y-4">
              {/* Price buttons */}
              <div>
                <p className="text-sm font-semibold mb-1">Price</p>
                <div className="flex gap-2 flex-wrap">
                  {["all","<20",">=20"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setPriceFilter(opt as typeof priceFilter)}
                      className={`px-3 py-1 rounded-md border text-sm cursor-pointer ${
                        priceFilter === opt ? "bg-blue-900 text-white" : "bg-white border-black/20 hover:bg-black/5"
                      }`}
                    >
                      {opt === "all" ? "All" : opt === "<20" ? "< $20" : "≥ $20"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time buttons */}
              <div>
                <p className="text-sm font-semibold mb-1">Time</p>
                <div className="flex gap-2 flex-wrap">
                  {["all","<30",">=30"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setTimeFilter(opt as typeof timeFilter)}
                      className={`px-3 py-1 rounded-md border text-sm cursor-pointer ${
                        timeFilter === opt ? "bg-blue-900 text-white" : "bg-white border-black/20 hover:bg-black/5"
                      }`}
                    >
                      {opt === "all" ? "All" : opt === "<30" ? "< 30 min" : "≥ 30 min"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary checkboxes */}
              <div>
                <p className="text-sm font-semibold mb-2">Dietary options</p>
                <div className="flex flex-wrap gap-3">
                  {ALL_DIETARY.map(tag => {
                    const checked = dietary.has(tag);
                    return (
                      <label key={tag} className="inline-flex items-center gap-2 text-sm select-none cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer"
                          checked={checked}
                          onChange={() => toggleDiet(tag)}
                        />
                        <span className={`${checked ? 'font-medium' : ''}`}>
                          {tag}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>


            </div>
          </div>
        </div>



        <ul className="mt-4 space-y-6 lg:space-y-10">
          {filtered.map((recipe) => {
            const details = [
              { label: "Materials:", value: recipe.materialsList },
              { label: "Detailed instructions:", value: recipe.instructions },
              { label: "Dietary options:", value: recipe.dietaryInclusive },
              { label: "Difficulty:", value: recipe.difficulty },
              { label: "Approx. price:", value: recipe.price },
              { label: "Approx. servings:", value: recipe.servings },
            ];
            const isOpen = openId === recipe.id;

            return (
              <li key={recipe.id} className="py-1 border-b border-black/5">
                <div className="grid grid-cols-[84px_1fr] gap-4 items-start sm:grid-cols-[96px_1fr] lg:grid-cols-[128px_1fr] lg:gap-8">
                  {recipe.image}
                  <div className="flex flex-col gap-1 sm:gap-1.5 lg:gap-2">
                    <h3 className="font-semibold text-base sm:text-lg lg:text-2xl leading-tight">
                      {recipe.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg opacity-80">{recipe.time}</p>

                    <a
                      href={recipe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base lg:text-lg underline-offset-4 hover:underline break-words"
                    >
                      {recipe.url.replace(/^https?:\/\//, "")}
                    </a>

                    <button
                      onClick={() => toggle(recipe.id)}
                      aria-expanded={isOpen}
                      className="mt-2 inline-flex items-center gap-1 text-sm sm:text-base lg:text-lg opacity-90 hover:opacity-100 transition duration-300 cursor-pointer"
                    >
                      <span>{isOpen ? "Collapse recipe" : "Expand recipe"}</span>
                      <svg className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </button>

                    <div
                      className={`${isOpen ? 'block' : 'hidden'}`}
                    >
                      <div className="min-h-0">
                        <ul className="mt-2 space-y-1.5 text-sm sm:text-base lg:text-lg">
                          {details.filter(d => d.value?.trim()).map((d, i) => (
                            <li key={i}>
                              <span className="font-semibold">{d.label}</span>{" "}
                              <span className="opacity-90">{d.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
