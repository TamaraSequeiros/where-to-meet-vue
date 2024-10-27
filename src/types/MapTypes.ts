export type Coordinate = {
    lat: number;
    lng: number;
}

export type Venue = {
    displayName: string;
    formattedAddress: string;
    rating: number;
    priceLevel?: string;
}

export type MarkerOptions = {
    options: {
        position: {
            lat: number;
            lng: number;
        }
    };
    venueInfo: Venue;
}