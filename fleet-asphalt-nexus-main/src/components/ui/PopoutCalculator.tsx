import React, { useState } from 'react';

export const PopoutCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [show, setShow] = useState(true);

  const handleButtonClick = (value: string) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEquals = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult.toString());
    } catch {
      setResult('Error');
    }
  };

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', right: 40, bottom: 40, zIndex: 1000, background: '#fff', border: '2px solid #eee', borderRadius: 12, boxShadow: '0 4px 24px #0002', width: 320, padding: 24 }} aria-label="Popout Calculator" role="dialog">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong id="calculator-title">Calculator</strong>
        <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }} aria-label="Close Calculator">&times;</button>
      </div>
      <div style={{ background: '#f9f9f9', borderRadius: 8, padding: 12, fontSize: 24, minHeight: 40, marginBottom: 8 }} aria-live="polite">{input || '0'}</div>
      <div style={{ background: '#f1f1f1', borderRadius: 8, padding: 8, fontSize: 18, minHeight: 24, marginBottom: 12, color: '#0a0' }} aria-live="polite">{result}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[7,8,9,'/'].map(v => <button key={v} onClick={() => handleButtonClick(v.toString())} style={{ fontSize: 20, padding: 12 }} aria-label={v.toString()}>{v}</button>)}
        {[4,5,6,'*'].map(v => <button key={v} onClick={() => handleButtonClick(v.toString())} style={{ fontSize: 20, padding: 12 }} aria-label={v.toString()}>{v}</button>)}
        {[1,2,3,'-'].map(v => <button key={v} onClick={() => handleButtonClick(v.toString())} style={{ fontSize: 20, padding: 12 }} aria-label={v.toString()}>{v}</button>)}
        {[0,'.','=','+'].map(v => v === '=' ? <button key={v} onClick={handleEquals} style={{ fontSize: 20, padding: 12, background: '#e0ffe0' }} aria-label="Equals">=</button> : <button key={v} onClick={() => handleButtonClick(v.toString())} style={{ fontSize: 20, padding: 12 }} aria-label={v.toString()}>{v}</button>)}
      </div>
      <button onClick={handleClear} style={{ marginTop: 16, width: '100%', padding: 10, background: '#ffe0e0', border: 'none', borderRadius: 6, fontWeight: 'bold', color: '#a00', fontSize: 16 }} aria-label="Clear Calculator">Clear</button>
    </div>
  );
}; 