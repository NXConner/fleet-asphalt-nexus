import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function GPSLocation() {
  const [location, setLocation] = useState<string|null>(null);
  const getLocation = () => setLocation('Lat: 40.7128, Lon: -74.0060 (mock)');
  return (
    <div className="p-4 border rounded">
      <Button onClick={getLocation}>Get GPS Location</Button>
      {location && <div className="mt-2">{location}</div>}
    </div>
  );
} 