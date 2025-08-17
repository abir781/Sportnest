import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const Location = () => {
  const position = [23.7925, 90.4078]; // Example: Dhaka coordinates

  return (
    <div className="py-12 px-4 md:px-0 bg-gray-100 dark:bg-gray-900 ">
      <h2 className="text-3xl font-bold text-center mb-6">📍 Our Location</h2>

      <div className="max-w-10/12 mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Club Address</h3>
          <p className="text-gray-700">
            SportNest Club<br />
            123 Victory Avenue<br />
            Gulshan, Dhaka 1212<br />
            Bangladesh
          </p>
        </div>

        <div className="h-[300px] rounded-lg overflow-hidden shadow-lg z-10">
          <MapContainer center={position} zoom={20} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
              <Popup>SportNest Club</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Location;
