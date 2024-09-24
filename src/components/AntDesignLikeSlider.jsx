import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import '../assets/AntDesignLikeSlider.css';

// Fungsi untuk membuat kombinasi pasangan parameter
// const createComparisonPairs = (parameters) => {
//   const pairs = [];
//   for (let i = 0; i < parameters.length; i++) {
//     for (let j = 0; j < parameters.length; j++) {
//       if (i !== j) {
//         pairs.push({ first: parameters[i].parameter, second: parameters[j].parameter });
//       }
//     }
//   }
//   return pairs;
// };
const createComparisonPairs = (parameters) => {
  const pairs = [];
  for (let i = 0; i < parameters.length; i++) {
    for (let j = i + 1; j < parameters.length; j++) {
      pairs.push({ first: parameters[i].parameter, second: parameters[j].parameter });
    }
  }
  return pairs;
};

function AntDesignLikeSlider() {
  const location = useLocation();
  const { parameters } = location.state; // Terima parameter dari DecisionPage
  const comparisonPairs = createComparisonPairs(parameters); // Membuat pasangan perbandingan

  // Set nilai slider untuk setiap perbandingan pasangan parameter
  const [sliders, setSliders] = useState(
    comparisonPairs.map(() => 50) // Nilai slider default (Netral, di tengah)
  );

  const handleSliderChange = (index, value) => {
    const newSliders = [...sliders];
    newSliders[index] = value;
    setSliders(newSliders);
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (values) => {
    console.log('Form submitted:', { sliders, comparisonPairs });
    // Lakukan sesuatu dengan nilai slider (misalnya mengirim ke server atau menampilkan hasil)
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      {comparisonPairs.map((pair, index) => (
        <Form.Item key={index} label={`${pair.second} vs ${pair.first}`}>
          <input
            type="range"
            min="0"
            max="100"
            value={sliders[index]}
            onChange={(e) => handleSliderChange(index, e.target.value)}
            className="slider"
            step={50}
          />
          <div className="tooltip" style={{ left: `${sliders[index]}%` }}>
            {sliders[index] > 50 ? `${pair.first} lebih baik` : sliders[index] < 50 ? `${pair.second} lebih baik` : 'Netral'}
          </div>
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AntDesignLikeSlider;
