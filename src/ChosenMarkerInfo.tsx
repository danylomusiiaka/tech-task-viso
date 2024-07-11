import React from 'react';

const ChosenMarkerInfo = ({ chosenMarkerInfo }) => {
    return (
        <div className='chosen-marker-info'>
            <h1>Your chosen location:</h1>
            {chosenMarkerInfo !== null ? (
                <>
                    <div>
                        <h2>Marker Info:</h2>
                        <p><strong>{chosenMarkerInfo.label}</strong></p>
                        <p><strong>Location:</strong> Lat: {chosenMarkerInfo.location.lat}, Lng: {chosenMarkerInfo.location.lng}</p>
                    </div>
                </>
            ) : (
                <div>Choose location from marked on map</div>
            )}
        </div>
    );
};

export default ChosenMarkerInfo;
