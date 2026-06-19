import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
export function LocationPage() {
  const position: [number, number] = [18.5944, -72.3074]; // Port-au-Prince coordinates
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A1628] mb-4">
            Visit Our Store
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Come experience our products in person. Our team is ready to help
            you find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-[#0A1628] mb-6">
              Contact Info
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg text-[#0A1628]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Address</h3>
                  <p className="text-gray-600">Port-au-Prince, Haiti</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Main Commercial District
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg text-green-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+509 4932 1962</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Available on WhatsApp
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600">duprevilyvano18@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Hours</h3>
                  <p className="text-gray-600">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-bold text-gray-900 mb-2">Store Manager</h3>
              <p className="text-gray-600">Duprevil Yvano Wood Adams</p>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative z-0">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full">
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              
              <Marker position={position}>
                <Popup>
                  <div className="text-center">
                    <strong className="block text-lg mb-1">
                      Ady Zone Haiti
                    </strong>
                    <span className="text-gray-600">
                      Best electronics & supplies
                    </span>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>);

}