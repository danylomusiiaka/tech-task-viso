import React from 'react';

interface Marker {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}

interface MarkerListProps {
    markers: Marker[];
}

const MarkerList: React.FC<MarkerListProps> = ({ markers }) => {
    return (
        <div className="marker-list">
            {markers.length !== 0 ? (
                <>
                    <h2>Marker List</h2>
                    <ul>
                        {markers.slice().reverse().map((marker) => ( 
                            <li key={marker.id}>
                                <h3>{`Quest ${marker.id}`}</h3> 
                                <h3>Location:</h3> Lat: {marker.position.lat}, Lng: {marker.position.lng}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div style={{ marginTop: '10px' }}>Please mark locations on the map</div>
            )}
        </div>
    );
};

export default MarkerList;
