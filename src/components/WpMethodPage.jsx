import WpDragDrop from "./WpDragDrop";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, InputNumber, Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Fungsi untuk mengirim data ke server
const postData = async (data) => {
  return axios.post('https://api.example.com/submit', data);
};

function WpMethodPage() {
  const location = useLocation();
  const [parameters, setParameters] = useState(location.state.values.parameters); // Ambil data dari location.state

  // Setup mutation untuk POST request
  const { mutate, isLoading, error } = useMutation(postData, {
    onSuccess: () => {
      message.success('Data berhasil dikirim!');
    },
    onError: (error) => {
      message.error(`Gagal mengirim data: ${error.message}`);
    }
  });

  // Fungsi untuk mengupdate nilai percentage pada setiap parameter
  const handleChange = (value, index) => {
    const newParameters = [...parameters];
    newParameters[index].order = value;
    setParameters(newParameters);
  };

  // Fungsi untuk memvalidasi bahwa setiap order unik
  const validateUniqueOrder = () => {
    const orders = parameters.map(param => param.order);
    const uniqueOrders = new Set(orders);
    return uniqueOrders.size === orders.length;
  };

  // Fungsi handleSubmit untuk mengirim data
  const handleSubmit = () => {
    if (!validateUniqueOrder()) {
      message.error('Nilai harus unik! Pastikan setiap urutan berbeda.');
      return;
    }

    console.log("Data yang dikirim:", parameters);
    mutate(parameters); // Mengirim data parameters yang sudah diperbarui
  };

  return (
    <Form onFinish={handleSubmit}>
      {parameters.map((param, index) => (
        <Form.Item
          label={`${param.content} sort`}
          key={param.id}
          rules={[
            {
              validator: (_, value) =>
                validateUniqueOrder()
                  ? Promise.resolve()
                  : Promise.reject('Nilai harus unik!'),
            },
          ]}
        >
          <InputNumber
            min={1}
            max={parameters.length}
            value={param.percentage}
            onChange={(value) => handleChange(value, index)}
          />
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
}

export default WpMethodPage;
