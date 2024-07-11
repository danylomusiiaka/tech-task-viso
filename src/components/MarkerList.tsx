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
                        {markers.slice().reverse().map((marker) => ( // Reversing the array before mapping
                            <li key={marker.id}>
                                <strong>{`Quest ${marker.id}`}</strong> <br />
                                <strong>Location:</strong> Lat: {marker.position.lat}, Lng: {marker.position.lng}
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
