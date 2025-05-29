import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PhotoCapture() {
  const [photo, setPhoto] = useState<string|null>(null);
  const capture = () => setPhoto('data:image/png;base64,MOCK');
  return (
    <div className="p-4 border rounded">
      <Button onClick={capture}>Capture Photo</Button>
      {photo && <div className="mt-2">Photo captured! (mock)</div>}
    </div>
  );
} 