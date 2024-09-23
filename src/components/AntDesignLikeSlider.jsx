import React, { useState } from 'react';
import '../assets/AntDesignLikeSlider.css';

function AntDesignLikeSlider() {
  // const marks = {
  //   0: {
  //     label: 'Lebih baik dari',
  //     value: 3,
  //   },
  //   25: {
  //     label: 'baik dari',
  //     value: 2,
  //   },
  //   50: {
  //     label: 'sama',
  //     value: 1,
  //   },
  //   75: {
  //     label: 'Lebih baik dari',
  //     value: 2,
  //   },
  //   100: {
  //     label: 'Lebih baik dari',
  //     value: 3,
  //   },
  // };
  const marks = {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%'
  };

  const [selectedMark, setSelectedMark] = useState(marks[50]);

  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setSelectedMark(marks[newValue]);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="slider"
        step="25"
      />
      <div className="tooltip" style={{ left: `${value}%` }}>
        {value}
      </div>
      <div className="slider-marks">
        {Object.entries(marks).map(([markValue, markLabel]) => (
          <div key={markLabel} className="mark" style={{ left: `${markValue}%` }}>
            {markLabel}
          </div>
        ))}
      </div>
      {selectedMark}
    </div>
  );
}

export default AntDesignLikeSlider;
