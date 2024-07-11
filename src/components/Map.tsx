import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerList from './MarkerList';
import { firestore } from '../firebase';
import { addDoc, collection, deleteDoc, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';

interface MarkerInfo {
    id: number;
    position: { lat: number; lng: number };
    timestamp: string;
    nextObjectRef: any;
}

interface MapComponentProps {
    onMarkerClick: (markerInfo: { label: string; location: { lat: number; lng: number } }) => void;
}



const containerStyle = {
    width: '100%',
    height: '400px'
};

const ref = collection(firestore, "markers");

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
        fetchMarkers();
    }, []);

    const fetchMarkers = async () => {
        const querySnapshot = await getDocs(query(ref, orderBy('id', 'asc')));
        const fetchedMarkers: MarkerInfo[] = [];
        querySnapshot.forEach((doc) => {
            const markerData = doc.data() as MarkerInfo;
            fetchedMarkers.push({
                id: markerData.id,
                position: markerData.position,
                timestamp: markerData.timestamp,
                nextObjectRef: doc.ref
            });
        });
        setMarkers(fetchedMarkers);
    };

    const mapClick = async (event: google.maps.MapMouseEvent) => {
        const newMarker = {
            id: markers.length + 1,
            position: {
                lat: event.latLng?.lat() || 0,
                lng: event.latLng?.lng() || 0
            },
            timestamp: new Date().toISOString(),
            nextObjectRef: null
        };

        if (markers.length > 0) {
            const lastIndex = markers.length - 1;
            const lastMarker = markers[lastIndex];
            const updatedLastMarker = { ...lastMarker, nextObjectRef: newMarker };
            await updateDoc(lastMarker.nextObjectRef, updatedLastMarker);
        }

        const docRef = await addDoc(ref, newMarker);

        setMarkers((currentMarkers) => [...currentMarkers, { ...newMarker, nextObjectRef: docRef }]);
    };


    const markerClick = (marker: MarkerInfo) => {
        onMarkerClick({ label: `Quest ${marker.id}`, location: marker.position });
    };

    const markerMoving = async (event: google.maps.MapMouseEvent, marker: MarkerInfo) => {
        const updatedMarkers = markers.map((m, index) => {
            if (m.id === marker.id) {
                const updatedMarker = {
                    ...m,
                    position: {
                        lat: event.latLng?.lat() || m.position.lat,
                        lng: event.latLng?.lng() || m.position.lng
                    }
                };

                updateDoc(marker.nextObjectRef, {
                    position: updatedMarker.position
                })

                if (index > 0) {
                    const prevMarker = markers[index - 1];
                    updateDoc(prevMarker.nextObjectRef, {
                        nextObjectRef: { position: updatedMarker.position }
                    })
                }

                return updatedMarker;
            }
            return m;
        });

        setMarkers(updatedMarkers);
    };




    const deleteLatest = async () => {
        if (markers.length === 0) return;

        const lastMarker = markers[markers.length - 1];

        const markerDocRef = doc(firestore, "markers", lastMarker.id.toString());

        await deleteDoc(markerDocRef);

        setMarkers((currentMarkers) => currentMarkers.slice(0, -1));
    };

    const deleteAll = async () => {

        const querySnapshot = await getDocs(query(ref));

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });


        setMarkers([]);
    };


    return (
        <div className='map-container'>
            <h1>Viso Google Map</h1>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={10}
                    onClick={mapClick}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.position.lat, lng: marker.position.lng }}
                            label={`Quest ${marker.id}`}
                            draggable={true}
                            onDragEnd={(e) => markerMoving(e, marker)}
                            onClick={() => markerClick(marker)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <div className='controls'>
                <button onClick={deleteLatest}>Delete Latest Marker</button>
                <button onClick={deleteAll}>Delete All Markers</button>
            </div>

            <MarkerList markers={markers} />

        </div>
    );
};

export default MapComponent;
