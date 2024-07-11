import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerList from './MarkerList';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const MapComponent = ({ onMarkerClick }) => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
    const [markers, setMarkers] = useState<{ id: number; position: { lat: number; lng: number } }[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<{ id: number; position: { lat: number; lng: number } } | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }, []);

    const handleMapClick = (event) => {
        const newMarker = {
            id: markers.length + 1,
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }
        };
        setMarkers((current) => [...current, newMarker]);
    };

    const handleMarkerClick = (marker: { id: number; position: { lat: number; lng: number } }) => {
        setSelectedMarker(marker);
        onMarkerClick({ label: `Quest ${marker.id}`, location: marker.position });
    };

    const handleMarkerDragEnd = (marker: { id: number; position: { lat: number; lng: number } }) => {
        const updatedMarkers = markers.map((m) => {
            if (m.id === marker.id) {
                return {
                    ...m,
                    position: {
                        lat: marker.position.lat,
                        lng: marker.position.lng
                    }
                };
            }
            return m;
        });
        setMarkers(updatedMarkers);

        if (selectedMarker && selectedMarker.id === marker.id) {
            onMarkerClick({ label: `Quest ${marker.id}`, location: marker.position });
        }
    };

    const handleDeleteLatest = () => {
        setMarkers((current) => current.slice(0, -1));
        setSelectedMarker(null);
        onMarkerClick(null);
    };

    const handleDeleteAll = () => {
        setMarkers([]);
        setSelectedMarker(null);
        onMarkerClick(null);
    };

    return (
        <div className='map-container'>
            <h1>Viso Google Map</h1>
            <LoadScript googleMapsApiKey="AIzaSyA4EwwYyOHTV4RpBu64EmP5Yoz62r2yAWQ">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={10}
                    onClick={handleMapClick}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.position.lat, lng: marker.position.lng }}
                            label={`Quest ${marker.id}`}
                            draggable={true}
                            onDragEnd={(e) => handleMarkerDragEnd({ id: marker.id, position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })}
                            onClick={() => handleMarkerClick(marker)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <div className='controls'>
                <button onClick={handleDeleteLatest}>Delete Latest Marker</button>
                <button onClick={handleDeleteAll}>Delete All Markers</button>
            </div>
            <div>
                <MarkerList markers={markers} />
            </div>
        </div>
    )
}

export default MapComponent;
