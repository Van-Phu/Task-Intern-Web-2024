import React, { useState } from 'react';
import './App.css';

function App() {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="container">
      <label className={checked ? 'custom-checkbox checked' : 'custom-checkbox'}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
      <span>This is my text</span>
    </div>
  );
}

export default App;
