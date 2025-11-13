import { Location } from './types'
import { BUILDING_COORDINATES } from './constants'

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3
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

const getDistancesToBuildings = (location: Location, buildings: string[]): string => {
    return buildings
        .map(building => {
            const buildingCoords = BUILDING_COORDINATES[building]
            if (!buildingCoords) return null
            
            const distance = calculateDistance(
                location.position.lat,
                location.position.lng,
                buildingCoords.lat,
                buildingCoords.lng
            )
            
            const distanceText = distance < 1000 
                ? `${Math.round(distance)}m`
                : `${(distance / 1000).toFixed(1)}km`
            
            return `${building.replace('-', ' ')} (${distanceText})`
        })
        .filter(Boolean)
        .join(', ')
}

interface LocationInfoWindowProps {
    location: Location
}

export default function LocationInfoWindow({ location }: LocationInfoWindowProps) {
    return (
        <div className="max-w-xs">
            <div className="font-semibold text-lg">{location.name}</div>
            <div className="space-y-0.5 text-sm">
                <div className="flex items-center gap-1">
                    <span className="font-medium">Type:</span>
                    <span>{location.type.join(', ').replace('-', ' ')}</span>
                </div>
                {location.dietary.length > 0 && (
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Dietary:</span>
                        <span>{location.dietary.join(', ').replace('-', ' ')}</span>
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <span className="font-medium">Near:</span>
                    <span>{getDistancesToBuildings(location, location.nearBuildings)}</span>
                </div>
                {location.website && (
                    <div className="flex gap-2 mt-1">
                        <a 
                            href={location.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Website
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
