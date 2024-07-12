import React from 'react';

interface ChosenMarkerInfoProps {
    chosenMarkerInfo: { label: string; location: { lat: number; lng: number } } | null;
}

const ChosenMarkerInfo: React.FC<ChosenMarkerInfoProps> = ({ chosenMarkerInfo }) => {
    return (
        <div className='chosen-marker-info'>
            <h1>Your chosen location:</h1>
            {chosenMarkerInfo !== null ? (
                <>
                    <div>
                        <h2>Marker Info:</h2>
                        <h3>{chosenMarkerInfo.label}</h3>
                        <h3>Location: </h3>
                        <p>Lat: {chosenMarkerInfo.location.lat}, Lng: {chosenMarkerInfo.location.lng}</p>
                    </div>
                </>
            ) : (
                <div>Choose location from marked on map</div>
            )}
        </div>
    );
};

export default ChosenMarkerInfo;
