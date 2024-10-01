// DirectMethodPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, InputNumber, Button, message, Typography, Card, Space } from 'antd';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axiosInstance';

const { Title } = Typography;

// Fungsi untuk mengirim data ke API
const postData = async (data) => {
  // Ganti URL dengan endpoint API Anda
  return axiosInstance.post('/public/dss', data);
};

const DirectMethodPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengakses data yang diteruskan dari HomePage
  const { parameters } = location.state.values || {};

  // Menggunakan React Query untuk menangani mutasi data
  const { mutate, isLoading } = useMutation(postData, {
    onSuccess: (data) => {
      console.log(data.data);
      message.success('Data berhasil dikirim!');
      // Optionally, reset form atau navigasi ke halaman lain
      // form.resetFields();
      navigate('/result', { state: { data: data.data } });
    },
    onError: (error) => {
      message.error(`Gagal mengirim data: ${error.message}`);
    }
  });

  // Jika data tidak ditemukan, tampilkan pesan error dan opsi untuk kembali
  if (!parameters) {
    return (
      <div style={{ padding: 24 }}>
        <Title level={3}>
          Data tidak ditemukan. Kembali ke{' '}
          <a onClick={() => navigate('/')}>Home</a>.
        </Title>
      </div>
    );
  }

  // Menyiapkan nilai awal untuk form
  const initialWeights = {};
  parameters.forEach(param => {
    initialWeights[param] = 0; // Nilai awal, bisa disesuaikan
  });

  // Handler untuk submit form
  const onFinish = (values) => {
    // Validasi: total weight harus sama dengan 100
    const totalWeight = Object.values(values.weights).reduce((sum, weight) => sum + weight, 0);
    if (totalWeight !== 100) {
      message.error(`Total weight harus sama dengan 100%. Saat ini: ${totalWeight}%`);
      return;
    }

    // Transformasi data ke format yang diinginkan
    console.log({
      ...location.state.values,
      weight: {
        method: 'DIRECT',
        values: parameters.map(param => values.weights[param])
      }
    });

    // Kirim data ke API
    mutate({
      ...location.state.values,
      weight: {
        method: 'DIRECT',
        values: parameters.map(param => values.weights[param]),
      }
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Input Weight Parameters</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ weights: initialWeights }}
      >
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {parameters.map((param, index) => (
              <Form.Item
                key={param}
                label={`${param} Weight`}
                name={['weights', param]}
                rules={[{ required: true, message: `Masukkan weight untuk ${param}` }]}
              >
                <InputNumber
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />
              </Form.Item>
            ))}
          </Space>
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DirectMethodPage;
