import React, { useState } from 'react';
import { Map as ReactMapGL, Marker, Popup } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import 'mapbox-gl/dist/mapbox-gl.css';
//import Navbar from './components/navbar';
import Button from '@mui/material/Button';
import '../styles/sidebar.css'

import Sidebar from './sidebar';


function Map() {

  const [viewport, setViewport] = useState({
    latitude: 27.173891,
    longitude: 78.042068,
    zoom: 10,
  });

  const [markers, setMarkers] = useState([
    { id: 1, longitude: 78.042068, latitude: 27.173891, title: 'Taj Mahal', remark: 'Seven Wonders of world.' },
    { id: 2, longitude: 77.231490, latitude: 28.651950, title: 'Delhi', remark: "India's capital." },
    { id: 3, longitude: 84.901639, latitude: 22.253275, title: 'NIT RKL', remark: "NIRF rank 19 in 2024." },
    { id: 4, longitude: 75.970955, latitude: 32.539555, title: 'Dalhousie', remark: "Recommended, greate place for trip in December." },
    { id: 5, longitude: 88.342785, latitude: 22.544813, title: "Kolkata", remark: "City of Joy, known for its cultural heritage." },
    { id: 6, longitude: 72.834435, latitude: 18.922003, title: "Mumbai", remark: "Financial capital of India, the 'MAYA NAGAR'." },
    { id: 7, longitude: 77.59369, latitude: 12.971598, title: "Bangalore", remark: "IT hub of India, known as the Silicon Valley of India." },
    { id: 8, longitude: 76.641271, latitude: 12.295810, title: "Mysore", remark: "Famous for its palace and Dasara festival." },
    { id: 9, longitude: 78.486671, latitude: 17.385044, title: "Hyderabad", remark: "The Hydrabadi biryani, a must thing to try." }
  ]);

  const [showPopup, setShowPopup] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMapClick = async (evt) => {
    const { lng, lat } = evt.lngLat;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZGV2dXp1bWFraTIiLCJhIjoiY20ycWJqdGh0MHExeDJrczgzanJtNW5xbyJ9.k8q9i2ZlXswL7NhkEms3yg`
      );
      const data = await response.json();
      const placeName = data.features[0]?.place_name || "Unknown Place";

      setNewPin({ id: markers.length + 1, longitude: lng, latitude: lat, title: placeName, remark: '' });
      setShowPopup(null);
    } catch (error) {
      console.error("Error fetching place name:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPin((prevPin) => ({ ...prevPin, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setMarkers([...markers, newPin]);
    setNewPin(null);
  };

  const handlePinClick = (marker) => {
    setViewport({
      ...viewport,
      latitude: marker.latitude,
      longitude: marker.longitude,
      zoom: 12,
    });
    setShowPopup(marker);
  };

  const handlePinDelete = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id));
    if (showPopup && showPopup.id === id) {
      setShowPopup(null);
    }
  };

  return (
    <div>
      <div className="container" style={{ display: 'flex', height: '91vh', overflow: 'hidden' }}>


        {/* sidebar */}


        <Sidebar markers={markers} handlePinClick={handlePinClick} handlePinDelete={handlePinDelete}  isDrawerOpen={isDrawerOpen} // Pass drawer state to Sidebar
          setIsDrawerOpen={setIsDrawerOpen}  />


        <ReactMapGL
          {...viewport}
          mapboxAccessToken="pk.eyJ1IjoiZGV2dXp1bWFraTIiLCJhIjoiY20ycWJqdGh0MHExeDJrczgzanJtNW5xbyJ9.k8q9i2ZlXswL7NhkEms3yg"
          onMove={(evt) => setViewport(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{
            width: '100%',
            height: '100vh',
            // Media query for small screens
            '@media (max-width: 600px)': { width: '100%' }
          }}
          onClick={handleMapClick}
        >

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
            >
              <RoomIcon style={{ color: 'red', fontSize: viewport.zoom * 5 }} />
            </Marker>
          ))}


          {showPopup && (
            <Popup
              latitude={showPopup.latitude}
              longitude={showPopup.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(null)}
              anchor="left"
            >
              <div>
                <strong><p>Location:</p>{showPopup.title}</strong>
                <p><p>Remark:</p>{showPopup.remark}</p>
              </div>
            </Popup>
          )}


          {newPin && (
            <Popup
              latitude={newPin.latitude}
              longitude={newPin.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPin(null)}
              anchor="left"
            >
              <div className="popup-form">
                <form onSubmit={handleFormSubmit}>
                  <label>Location:</label>
                  <p>{newPin.title}</p>
                  <label>Remark:</label>
                  <textarea
                    name="remark"
                    value={newPin.remark}
                    onChange={handleInputChange}
                    required
                  />

                  <Button type="submit" variant="outlined" color="success">
                    App Pin
                  </Button>
                </form>
              </div>
            </Popup>
          )}


          {newPin && (
            <Marker
              longitude={newPin.longitude}
              latitude={newPin.latitude}
              anchor="bottom"
            >
              <RoomIcon style={{ color: '#0f0f0f', fontSize: viewport.zoom * 5 }} />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  )
};


export default Map;


