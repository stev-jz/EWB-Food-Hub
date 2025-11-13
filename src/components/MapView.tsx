'use client';
import { useEffect, useMemo, useState } from "react"
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { Location, Filters } from './types'
import { PLACE_TYPES, DIETARY_OPTIONS, BUILDINGS, SAMPLE_LOCATIONS, BUILDING_COORDINATES } from './constants'
import FilterDropdown from './FilterDropdown'
import LocationInfoWindow from './LocationInfoWindow'

// Calculate distance between two coordinates in meters
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lng2 - lng1) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}

// Check if location is within 200m of any selected building
const isNearby = (location: Location, selectedBuildings: string[]): boolean => {
    if (selectedBuildings.length === 0) return true
    
    return selectedBuildings.some(building => {
        const buildingCoords = BUILDING_COORDINATES[building]
        if (!buildingCoords) return false
        
        const distance = calculateDistance(
            location.position.lat,
            location.position.lng,
            buildingCoords.lat,
            buildingCoords.lng
        )
        
        return distance <= 200 // Within 200 meters
    })
}

export default function MapView() {
    const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: mapsKey })
    
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [filters, setFilters] = useState<Filters>({
        types: [], dietary: [], nearBuildings: []
    })
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)

    const filteredLocations = useMemo(() => 
        SAMPLE_LOCATIONS.filter(location => {
            if (filters.types.length > 0 && !filters.types.some(type => location.type.includes(type))) return false
            if (filters.dietary.length > 0 && !filters.dietary.some(dietary => location.dietary.includes(dietary))) return false
            if (filters.nearBuildings.length > 0 && !isNearby(location, filters.nearBuildings)) return false
            return true
        }), [filters]
    )

    const toggleFilter = (category: keyof Filters, value: string | number) => {
        setFilters(prev => {
            const current = prev[category] as any[]
            return { ...prev, [category]: current.includes(value) ? current.filter(item => item !== value) : [...current, value] }
        })
    }

    const toggleDropdown = (dropdown: string) => setOpenDropdown(openDropdown === dropdown ? null : dropdown)

    const handleLocationClick = (location: Location) => {
        setSelectedLocation(location)
        if (map) {
            map.panTo(location.position)
            map.setZoom(17)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && !(event.target as Element).closest('.relative')) {
                setOpenDropdown(null)
            }
        }
        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openDropdown])

    if (loadError) return <div className="text-red-600">Google Maps failed to load. {String(loadError.message || loadError.name)}</div>
    if (!isLoaded) return <div>Loading map…</div>

    return (
        <div className="w-full">
            <div className="mb-4">
                <div className="text-sm font-medium text-black mb-2">Filters</div>
                <div className="flex flex-wrap gap-2">
                    <FilterDropdown category="types" label="Place Type" options={PLACE_TYPES} displayTransform={(val) => val.replace('-', ' ')} isOpen={openDropdown === 'types'} filters={filters} onToggle={toggleFilter} onToggleDropdown={toggleDropdown} />
                    <FilterDropdown category="dietary" label="Dietary" options={DIETARY_OPTIONS} displayTransform={(val) => val.replace('-', ' ')} isOpen={openDropdown === 'dietary'} filters={filters} onToggle={toggleFilter} onToggleDropdown={toggleDropdown} />
                    <FilterDropdown category="nearBuildings" label="Within 200m of" options={BUILDINGS} displayTransform={(val) => val.replace('-', ' ')} isOpen={openDropdown === 'nearBuildings'} filters={filters} onToggle={toggleFilter} onToggleDropdown={toggleDropdown} />
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex-1">
                    <GoogleMap 
                        mapContainerStyle={{ width: "100%", height: "600px" }} 
                        center={{ lat: 43.6629, lng: -79.3957 }} 
                        zoom={15}
                        onLoad={(map) => setMap(map)}
                    >
                        {filteredLocations.map((location) => (
                            <Marker key={location.id} position={location.position} onClick={() => setSelectedLocation(location)} />
                        ))}
                        {selectedLocation && (
                            <InfoWindow position={selectedLocation.position} onCloseClick={() => setSelectedLocation(null)}>
                                <LocationInfoWindow location={selectedLocation} />
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>

                {/* Location List - Scrollable sidebar */}
                <div className="w-80 h-[600px] overflow-y-auto pl-6">
                    <h2 className="text-2xl font-semibold mb-6 text-black sticky top-0 bg-white pb-3">All Locations</h2>
                    <div className="space-y-6">
                        {SAMPLE_LOCATIONS.map((location) => (
                            <div key={location.id}>
                                <button
                                    onClick={() => handleLocationClick(location)}
                                    className="text-left hover:text-blue-600 cursor-pointer w-full"
                                >
                                    <h3 className="text-lg font-semibold text-black">{location.name}</h3>
                                </button>
                                <p className="text-gray-600 mt-1">{location.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}