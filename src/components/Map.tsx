import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerList from './MarkerList';

interface MarkerInfo {
    id: number;
    position: { lat: number; lng: number };
}

interface MapComponentProps {
    onMarkerClick: (markerInfo: { label: string; location: { lat: number; lng: number } }) => void;
}

const containerStyle = {
    width: '100%',
    height: '400px'
};

const MapComponent: React.FC<MapComponentProps> = ({ onMarkerClick }) => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
    const [markers, setMarkers] = useState<MarkerInfo[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }, []);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newMarker = {
            id: markers.length + 1,
            position: {
                lat: event.latLng?.lat() || 0,
                lng: event.latLng?.lng() || 0
            }
        };
        setMarkers((current) => [...current, newMarker]);
    };

    const handleMarkerClick = (marker: MarkerInfo) => {
        onMarkerClick({ label: `Quest ${marker.id}`, location: marker.position });
    };

    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent, marker: MarkerInfo) => {
        const updatedMarkers = markers.map((m) =>
            m.id === marker.id
                ? { ...m, position: { lat: event.latLng?.lat() || 0, lng: event.latLng?.lng() || 0 } }
                : m
        );
        setMarkers(updatedMarkers);
    };

    const handleDeleteLatest = () => {
        setMarkers((current) => current.slice(0, -1));
    };

    const handleDeleteAll = () => {
        setMarkers([]);
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
                            onDragEnd={(e) => handleMarkerDragEnd(e, marker)}
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
    );
};

export default MapComponent;
