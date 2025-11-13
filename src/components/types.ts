export interface Location {
    id: number
    name: string
    address: string
    position: { lat: number; lng: number }  
    type: string[] 
    dietary: string[] 
    nearBuildings: string[] 
    website?: string
}

export interface Filters {
    types: string[]
    dietary: string[]
    nearBuildings: string[]
}
