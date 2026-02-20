'use client';
import { useEffect, useMemo, useState } from "react"
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { Location, Filters } from './types'
import { PLACE_TYPES, DIETARY_OPTIONS, BUILDINGS, BUILDING_COORDINATES } from './constants'
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

    const [locations, setLocations] = useState<Location[]>([])
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [filters, setFilters] = useState<Filters>({
        types: [], dietary: [], nearBuildings: []
    })
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [distances, setDistances] = useState<Record<number, string>>({})
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null)

    const filteredLocations = useMemo(() =>
        locations.filter(location => {
            if (filters.types.length > 0 && !filters.types.some(type => location.type.includes(type))) return false
            if (filters.dietary.length > 0 && !filters.dietary.some(dietary => location.dietary.includes(dietary))) return false
            if (filters.nearBuildings.length > 0 && !isNearby(location, filters.nearBuildings)) return false
            return true
        }), [filters, locations]
    )

    useEffect(()=> { //takes in nothing, does whatever is below
        fetch('/locations.json').then( res => res.json()).then(data => {
            const mappedLocations = data.map((loc :any) => ({
                id: loc.id,
                name: loc.name,
                address: loc.address,
                position: { lat: loc.lat, lng: loc.lng },
                type: loc.type ? loc.type.toLowerCase().split(',').map((s: string) => s.trim()) : [],
                dietary: [],
                nearBuildings: [],
                website: loc.url || ''
                })
            )
            setLocations(mappedLocations)
        })
        }, [])

    // Get User Location & Calculate Distances
    useEffect(() => {
        if (!isLoaded) return
        if (locations.length === 0) return
        // Helper to chunk an array into batches
        const chunkArray = <T,>(arr: T[], size: number): T[][] => {
            const chunks: T[][] = []
            for (let i = 0; i < arr.length; i += size) {
                chunks.push(arr.slice(i, i + size))
            }
            return chunks
}

        // 1. Get User Location
        if (navigator.geolocation) {
            console.log("Requesting user location...")
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    console.log("User location found:", userPos)
                    setUserLocation(userPos)

                    // Check Cache
                    const cachedData = sessionStorage.getItem('food-hub-distances')
                    if (cachedData) {
                        const { userPos: cachedPos, distances: cachedDistances } = JSON.parse(cachedData)
                        const dist = calculateDistance(userPos.lat, userPos.lng, cachedPos.lat, cachedPos.lng)

                        // If user moved less than 100 meters, use cache
                        if (dist < 100) {
                            console.log("Using cached distances (User moved < 100m)")
                            setDistances(cachedDistances)
                            return
                        }
                    }

                    // 2. Calculate Distances in batches of 25
                    console.log("Fetching new distances from API...")
                    const service = new google.maps.DistanceMatrixService()
                    const locationBatches = chunkArray(locations, 25)
                    const newDistances: Record<number, string> = {}

                    const processBatch = (batchIndex: number) => {
                        if (batchIndex >= locationBatches.length) {
                            // All batches done - save and set
                            setDistances(newDistances)
                            sessionStorage.setItem('food-hub-distances', JSON.stringify({
                                userPos,
                                distances: newDistances
                            }))
                            return
                        }

                        const batch = locationBatches[batchIndex]
                        const batchStartIndex = batchIndex * 25

                        service.getDistanceMatrix(
                            {
                                origins: [userPos],
                                destinations: batch.map(loc => loc.position),
                                travelMode: google.maps.TravelMode.WALKING,
                            },
                            (response, status) => {
                                if (status === 'OK' && response) {
                                    response.rows[0].elements.forEach((element, index) => {
                                        if (element.status === 'OK') {
                                            const locationIndex = batchStartIndex + index
                                            newDistances[locations[locationIndex].id] = element.duration.text
                                        }
                                    })
                                    // Process next batch after a small delay to avoid rate limiting
                                    setTimeout(() => processBatch(batchIndex + 1), 200)
                                } else {
                                    console.error(`Distance Matrix batch ${batchIndex} failed:`, status)
                                    // Still try next batch even if one fails
                                    setTimeout(() => processBatch(batchIndex + 1), 200)
                                }
                            }
                        )
                    }

                    processBatch(0)
                },
                (error) => {
                    console.error("Geolocation error:", error)
                }
            )
        } else {
            console.error("Geolocation not supported")
        }
    }, [isLoaded, locations])

    // Pan to user location when found
    useEffect(() => {
        if (userLocation && map) {
            map.panTo(userLocation)
        }
    }, [userLocation, map])
    useEffect(() => {
    if (userLocation && selectedLocation && !distances[selectedLocation.id]) {
        const service = new google.maps.DistanceMatrixService()
        service.getDistanceMatrix(
            {
                origins: [userLocation],
                destinations: [selectedLocation.position],
                travelMode: google.maps.TravelMode.WALKING,
            },
            (response, status) => {
                if (status === 'OK' && response?.rows[0].elements[0].status === 'OK') {
                    setDistances(prev => ({
                        ...prev,
                        [selectedLocation.id]: response.rows[0].elements[0].duration.text
                    }))
                }
            }
        )
    }
}, [userLocation, selectedLocation, distances])

    const toggleFilter = (category: keyof Filters, value: string | number) => {
        setFilters(prev => {
            const current = prev[category] as (string | number)[]
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
                    <FilterDropdown category="types" label="Place Type" options={PLACE_TYPES} displayTransform={(val) => String(val).replace('-', ' ')} isOpen={openDropdown === 'types'} filters={filters} onToggle={toggleFilter} onToggleDropdown={toggleDropdown} />
                    <FilterDropdown category="dietary" label="Dietary" options={DIETARY_OPTIONS} displayTransform={(val) => String(val).replace('-', ' ')} isOpen={openDropdown === 'dietary'} filters={filters} onToggle={toggleFilter} onToggleDropdown={toggleDropdown} />
                    <FilterDropdown category="nearBuildings" label="Within 200m of" options={BUILDINGS} displayTransform={(val) => String(val).replace('-', ' ')} isOpen={openDropdown === 'nearBuildings'} filters={filters} onToggle={toggleFilter} onToggleDropdown={toggleDropdown} />
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex-1">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "600px" }}
                        center={userLocation || { lat: 43.6629, lng: -79.3957 }}
                        zoom={15}
                        onLoad={(map) => setMap(map)}
                    >
                        {/* Show User Location Marker */}
                        {userLocation && (
                            <Marker
                                position={userLocation}
                                icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 7,
                                    fillColor: "#4285F4",
                                    fillOpacity: 1,
                                    strokeColor: "white",
                                    strokeWeight: 2,
                                }}
                                title="You are here"
                                zIndex={999}
                            />
                        )}

                        {filteredLocations.map((location) => (
                            <Marker key={location.id} position={location.position} onClick={() => setSelectedLocation(location)} />
                        ))}
                        {selectedLocation && (
                            <InfoWindow position={selectedLocation.position} onCloseClick={() => setSelectedLocation(null)}>
                                <div>
                                    <LocationInfoWindow location={selectedLocation} />
                                    {distances[selectedLocation.id] && (
                                        <div className="mt-2 text-sm font-semibold text-blue-600">
                                            🚶 {distances[selectedLocation.id]} walk
                                        </div>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>

                {/* Location List - Scrollable sidebar */}
                <div className="w-80 h-[600px] overflow-y-auto pl-6">
                    <h2 className="text-2xl font-semibold mb-6 text-black sticky top-0 bg-white pb-3">All Locations</h2>
                    <div className="space-y-6">
                    {locations.map((location) => (
                        <div key={location.id}>
                            <button
                                onClick={() => handleLocationClick(location)}
                                className="text-left hover:text-blue-600 cursor-pointer w-full"
                            >
                                {/* dangerouslySetInnerHTML forces React to render special characters like &#8217; properly */}
                                <h3 
                                    className="text-lg font-semibold text-black"
                                    dangerouslySetInnerHTML={{ __html: location.name }}
                                />
                            </button>
                            
                            {/* Changed to flex-col to stack the address and the button vertically */}
                            <div className="flex flex-col items-start mt-1 gap-2">
                                <p className="text-gray-600 text-sm truncate w-full">{location.address}</p>
                                
                                {/* If we have the distance, show it. If not, show the button! */}
                                {distances[location.id] ? (
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap border border-blue-100">
                                        🚶 {distances[location.id]}
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleLocationClick(location)}
                                        className="text-[10px] font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full whitespace-nowrap border border-gray-200 transition-colors cursor-pointer"
                                    >
                                        📍 Click for walk time
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}