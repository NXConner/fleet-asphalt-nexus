import { useState } from 'react';

const defaultColors = {
  primary: '#1e293b',
  accent: '#f59e42',
  background: '#f8fafc',
  foreground: '#22223b',
};

export default function ThemeColorPicker() {
  const [colors, setColors] = useState(() => {
    const stored = localStorage.getItem('custom-theme-colors');
    return stored ? JSON.parse(stored) : defaultColors;
  });

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    localStorage.setItem('custom-theme-colors', JSON.stringify(newColors));
    document.documentElement.style.setProperty(`--${key}`, value);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Theme Color Picker</h2>
      <div className="space-y-4">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-32 font-medium capitalize" htmlFor={`color-${key}`}>{key} color</label>
            <input
              id={`color-${key}`}
              type="color"
              value={value}
              onChange={e => handleColorChange(key, e.target.value)}
              className="w-10 h-10 border rounded"
              aria-label={`${key} color picker`}
              title={`Pick ${key} color`}
            />
            <span className="w-8 h-8 rounded border" style={{ background: value }}></span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            setColors(defaultColors);
            Object.entries(defaultColors).forEach(([key, value]) => {
              document.documentElement.style.setProperty(`--${key}`, value);
            });
            localStorage.removeItem('custom-theme-colors');
          }}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
} 