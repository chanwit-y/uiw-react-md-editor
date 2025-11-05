import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import './Map.css'

// Fix for default marker icons in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Demo locations
const locations = [
	{
		position: [51.505, -0.09] as [number, number],
		title: 'London, UK',
		description: 'A beautiful city with rich history and culture.',
	},
	{
		position: [40.7128, -74.006] as [number, number],
		title: 'New York, USA',
		description: 'The city that never sleeps.',
	},
	{
		position: [48.8566, 2.3522] as [number, number],
		title: 'Paris, France',
		description: 'City of lights and romance.',
	},
	{
		position: [35.6762, 139.6503] as [number, number],
		title: 'Tokyo, Japan',
		description: 'Modern metropolis blending tradition and innovation.',
	},
]

export const Map = () => {
	return (
		<div className="map-demo-container">
			<div className="map-header">
				<h1>Interactive Map Demo</h1>
				<p>Click on markers to see location details</p>
			</div>
			<MapContainer
				center={[51.505, -0.09]}
				zoom={3}
				scrollWheelZoom={true}
				className="map-container"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((location, index) => (
					<Marker key={index} position={location.position}>
						<Popup>
							<div className="map-popup">
								<h3>{location.title}</h3>
								<p>{location.description}</p>
								<small>
									Coordinates: {location.position[0].toFixed(4)}, {location.position[1].toFixed(4)}
								</small>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
			<div className="map-footer">
				<p>Powered by React Leaflet & OpenStreetMap</p>
			</div>
		</div>
	)
}