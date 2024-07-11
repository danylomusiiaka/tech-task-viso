import React from 'react';

const MarkerList = ({ markers }) => {
    return (
        <div className="marker-list">
            {markers.length !== 0 ? (
                <>
                    <h2>Marker List</h2>
                    <ul>
               
                        {markers.map((marker) => (
                            <li key={marker.id}>
                                <strong>{`Quest ${marker.id}`}</strong> <br />
                                <strong>Location:</strong> Lat: {marker.position.lat}, Lng: {marker.position.lng}
                            </li>
                        ))}

                    </ul>
                </>
            ) : (
                <div style={{'marginTop': '10px'}}>Please mark locations on the map</div>
            )}
        </div>
    );
};

export default MarkerList;
