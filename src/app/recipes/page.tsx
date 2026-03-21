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
    title: "Spicy Sriracha Noodles",
    url: "http://budgetbytes.com/spicy-noodles/",
    image: <img src="/sriracha-noodles.jpg" alt="Spicy Sriracha Noodles picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-lg" />,
    time: "15 minutes",
    minutes: 15,
    priceEstimate: 2.5,
    dietaryOptions: ["vegan", "nut-free", "x"],
    materialsList: "4 oz. lo mein noodles, 2 Tbsp butter, 1/4 tsp crushed red pepper, 2 large eggs, 1 Tbsp brown sugar, 1 Tbsp soy sauce, 2 Tbsp sriracha, 1 handful fresh cilantro, 1 green onion (sliced)",
    instructions: "1. Prepare the sauce for the noodles. In a small bowl, stir together the brown sugar, soy sauce, and sriracha. Set the sauce aside.\n2. Bring a pot of water to a boil for the noodles. Once boiling, add the noodles and boil until tender. Drain the noodles in a colander.\n3. While waiting for the water to boil, crack two eggs into a bowl then whisk lightly.\n4. Heat the butter in a skillet over medium heat, then add the eggs and crushed pepper and lightly scramble the eggs. Avoid over cooking the eggs.\n5. Once the noodles have drained, add them to the skillet with the eggs, then drizzle the sauce over top. Toss the noodles and eggs to coat in the sauce.\n6. Top the noodles with fresh cilantro and sliced green onion, then serve",
    difficulty: "Easy",
    servings: "2"
  },
  {
    id: "pasta",
    title: "Hearty Black Bean Quesadillas",
    url: "https://www.budgetbytes.com/hearty-black-bean-quesadillas/",
    image: <img src="/quesadillas.webp" alt="Hearty Black Bean Quesadillas picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-lg" />,
    time: "15 minutes",
    minutes: 15,
    priceEstimate: 6.73,
    dietaryOptions: ["vegan", "y"],
    materialsList: "1 15oz. can black beans, 1 cup frozen corn, 1/2 cup red onion, 1 clove garlic, 1/4 bunch fresh cilantro (about ½ cup chopped), 2 cups shredded cheddar cheese, 1 batch taco seasoning, 10 flour tortillas (7-inch diameter)",
    instructions: "1. Drain the black beans and add them to a bowl along with the frozen corn (no need to thaw)\n2. Finely dice the onion, mince the garlic, and roughly chop the cilantro.\n3. Add the onion, garlic, cilantro, shredded cheddar, and taco seasoning to the bowl with the beans and corn. Stir until everything is evenly combined and coated in seasoning.\n4. Place a half cup of the filling on one side of each tortilla and fold over. Cook the quesadillas in a skillet over medium heat on each side until brown and crispy and the cheesy filling has melted. Slice into triangles then serve.\n5. To freeze the quesadillas, stack the filled and uncooked quesadillas with a piece of parchment paper between each quesadilla. Place in a freezer bag and freeze for up to three months. To reheat either microwave (for a soft quesadilla) or cook in a skillet on low heat (make sure to use low heat so that the filling has time to thaw and melt before the outside burns).",
    difficulty: "Easy",
    servings: "10"
  },
  {
    id: "salad",
    title: "Peanut Butter Banana Smoothie",
    url: "https://www.budgetbytes.com/peanut-butter-banana-smoothie/",
    image: <img src="/pbj-smoothie.webp" alt="Peanut Butter Banana Smoothie picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-lg" />,
    time: "5 minutes",
    minutes: 5,
    priceEstimate: 0.75,
    dietaryOptions: ["nut-free", "z"],
    materialsList: "1 frozen banana (sliced), 2 Tbsp peanut butter, 1 tsp brown sugar, 1/4 tsp vanilla extract, 1 cup milk",
    instructions: "1. Add the sliced banana, peanut butter, brown sugar, vanilla extract, and milk to a blender.\n2. Blend the ingredients until smooth. If the smoothie is too thick, add more milk. If the smoothie is too thin, add more frozen banana. Taste and adjust the sweetness to your liking.",
    difficulty: "Easy",
    servings: "1"
  },
  {
    id: "flourless-pb-cookies",
    title: "Flourless Peanut Butter Cookies",
    url: "https://www.budgetbytes.com/flourless-peanut-butter-cookies/",
    image: <img src="/pb-cookies.webp" alt="Flourless Peanut Butter Cookies picture" className="object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-lg" />,
    time: "27 minutes",
    minutes: 27,
    priceEstimate: 1.65,
    dietaryOptions: ["y", "z"],
    materialsList: "1 cup natural peanut butter, 3/4 cup granulated sugar, 2/3 cup powdered sugar, 1 large egg, 1/2 tsp vanilla extract, 1/2 tsp baking powder",
    instructions: "1. Preheat the oven to 350ºF. Add all of the ingredients to a bowl and stir until it forms a cohesive dough. It should be firm enough to pull away from the sides of the bowl. If the dough is still too soft, add a tablespoon or two more of powdered sugar to further firm up the dough.\n2. Divide the cookie dough into twelve pieces. Roll each piece into a ball then flatten it slightly. Place the cookies on a parchment-lined baking sheet and then use a fork to create a cross hatch pattern on the top of the cookie.\n3. Bake the cookies for 12 minutes in the preheated oven. After baking, allow them to cool for about five minutes on the baking sheet, or until they're firm enough to lift with a spatula.\n4. Transfer the cookies to a wire rack to cool completely, then serve and enjoy.",
    difficulty: "Easy",
    servings: "12"
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
      if (next.has(d)) {
        next.delete(d);
      } else {
        next.add(d);
      }
      return next;
    }); const norm = (s?: string) => (s || '').toLowerCase().trim();

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
        <h1 className="font-semibold tracking-tight text-[clamp(20px,5vw,32px)]">
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
            <svg className={`h-4 w-4 transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </button>

          <div
            className={`${filtersOpen ? 'block' : 'hidden'}`}
          >
            <div className="min-h-0 mt-3 space-y-4">
              {/* Price buttons */}
              <div>
                <p className="text-sm font-semibold mb-1">Price</p>
                <div className="flex gap-2 flex-wrap">
                  {["all", "<20", ">=20"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setPriceFilter(opt as typeof priceFilter)}
                      className={`px-3 py-1 rounded-md border text-sm cursor-pointer ${priceFilter === opt ? "bg-blue-900 text-white" : "bg-white border-black/20 hover:bg-black/5"
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
                  {["all", "<30", ">=30"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setTimeFilter(opt as typeof timeFilter)}
                      className={`px-3 py-1 rounded-md border text-sm cursor-pointer ${timeFilter === opt ? "bg-blue-900 text-white" : "bg-white border-black/20 hover:bg-black/5"
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



        <ul className="mt-4 space-y-2">
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
              <li key={recipe.id} className="border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-[84px_1fr] gap-4 items-start sm:grid-cols-[96px_1fr] lg:grid-cols-[128px_1fr] lg:gap-8">
                  {recipe.image}
                  <div className="flex flex-col gap-1 sm:gap-1.5 lg:gap-2">
                    <h3 className="font-semibold text-base sm:text-lg lg:text-2xl leading-tight">
                      {recipe.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-blue-900">{recipe.time}</p>

                    <a
                      href={recipe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base lg:text-lg underline-offset-4 hover:underline break-words"
                    >
                      link to recipe
                    </a>

                    <button
                      onClick={() => toggle(recipe.id)}
                      aria-expanded={isOpen}
                      className="mt-2 inline-flex items-center gap-1 text-sm sm:text-base lg:text-lg opacity-90 hover:opacity-100 transition duration-300 cursor-pointer"
                    >
                      <span>{isOpen ? "Collapse recipe" : "Expand recipe"}</span>
                      <svg className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                    </button>

                    <div
                      className={`${isOpen ? 'block' : 'hidden'}`}
                    >
                      <div className="min-h-0">
                        <ul className="mt-2 space-y-1.5 text-sm sm:text-base lg:text-lg">
                          {details.filter(d => d.value?.trim()).map((d, i) => (
                            <li key={i}>
                              <span className={d.label === "Materials:" || d.label === "Detailed instructions:" ? "font-semibold block" : "font-semibold"}>
                                {d.label}
                              </span>{" "}
                              <span className={d.label === "Detailed instructions:" ? "opacity-90 whitespace-pre-line" : "opacity-90"}>
                                {d.value}
                              </span>
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
