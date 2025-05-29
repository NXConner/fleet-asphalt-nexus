import ThemeColorPicker from "./ThemeColorPicker";

// Add a button to open ThemeColorPicker
<button
  className="ml-2 px-2 py-1 bg-accent text-foreground rounded"
  onClick={() => setShowPicker(v => !v)}
  aria-label="Open Theme Color Picker"
  title="Open Theme Color Picker"
>
  🎨 Custom Colors
</button>
{showPicker && <ThemeColorPicker />} 