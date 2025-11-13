export const PLACE_TYPES = ['cafe', 'food court/dining hall', 'restaurant', 'fast food']
export const CUISINE_TYPES = ['american', 'italian', 'chinese', 'indian', 'mexican']
export const DIETARY_OPTIONS = ['vegetarian', 'vegan', 'gluten-free', 'halal', 'kosher', 'dairy-free', 'nut-free', 'soy-free', 'egg-free', 'etc']
export const BUILDINGS = ['robarts', 'med-sci', 'bahen', 'sidney-smith', 'new-college', 'hart-house', 'convocation-hall', 'myhal', 'gerstein']

export const BUILDING_COORDINATES: Record<string, { lat: number; lng: number }> = {
    'robarts': { lat: 43.6644, lng: -79.4006 },
    'med-sci': { lat: 43.6520, lng: -79.3825 },
    'bahen': { lat: 43.6599, lng: -79.3962 },
    'sidney-smith': { lat: 43.6625, lng: -79.3950 },
    'new-college': { lat: 43.6598, lng: -79.4030 },
    'hart-house': { lat: 43.6630, lng: -79.3950 },
    'convocation-hall': { lat: 43.6630, lng: -79.3970 },
    'my-hall': { lat: 43.6610, lng: -79.3980 },
    'gerstein': { lat: 43.6650, lng: -79.3990 }
}

export const SAMPLE_LOCATIONS = [
    {
        id: 1,
        name: "Robarts Library Food Court",
        address: "130 St George St, Toronto",
        position: { lat: 43.6644, lng: -79.4006 },
        type: ['food-court', 'coffee'],
        dietary: ['vegetarian', 'vegan'],
        nearBuildings: ['robarts', 'sidney-smith'],
        website: "https://www.uoft.ca/dining"
    },
    {
        id: 2,
        name: "Med Sci Café",
        address: "1 King's College Circle, Toronto",
        position: { lat: 43.6520, lng: -79.3825 },
        type: ['cafe', 'coffee'],
        dietary: ['vegetarian', 'vegan', 'gluten-free'],
        nearBuildings: ['med-sci', 'convocation-hall'],
        website: "https://medsci.utoronto.ca/cafe"
    },
    {
        id: 3,
        name: "Hart House Restaurant",
        address: "7 Hart House Circle, Toronto",
        position: { lat: 43.6630, lng: -79.3950 },
        type: ['restaurant', 'dining-hall'],
        dietary: ['vegetarian', 'halal'],
        nearBuildings: ['hart-house', 'convocation-hall', 'robarts'],
        website: "https://harthouse.ca/dining"
    },
    {
        id: 4,
        name: "Sample Location 1",
        address: "123 College St, Toronto",
        position: { lat: 43.6600, lng: -79.3930 },
        type: ['cafe', 'restaurant'],
        dietary: ['vegetarian', 'gluten-free', 'dairy-free'],
        nearBuildings: ['bahen', 'sidney-smith', 'new-college'],
        website: "https://example.com/sample-location-1"
    },
    {
        id: 5,
        name: "Sample Location 2",
        address: "456 Spadina Ave, Toronto",
        position: { lat: 43.6580, lng: -79.4000 },
        type: ['fast food', 'food court/dining hall'],
        dietary: ['vegan', 'halal', 'kosher'],
        nearBuildings: ['gerstein', 'my-hall', 'robarts'],
        website: "https://example.com/sample-location-2"
    }
]
