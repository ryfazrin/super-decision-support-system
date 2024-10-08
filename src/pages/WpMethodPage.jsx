// WpMethodPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, InputNumber, Button, message, Typography, Card, Space } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axiosInstance';

const { Title } = Typography;

// Fungsi untuk mengirim data ke server
const postData = async (data) => {
  // Ganti URL dengan endpoint API Anda
  return axiosInstance.post('/public/dss', data);
};

function WpMethodPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengakses data yang diteruskan dari HomePage
  const { parameters } = location.state.values || {};

  // Menggunakan React Query untuk menangani mutasi data
  const { mutate, isLoading } = useMutation(postData, {
    onSuccess: (data) => {
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
    // Kirim data ke API
    mutate({
      ...location.state.values,
      weight: {
        method: 'DIRECT',
        values: parameters.map(param => values.weight[param])
      }
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Input Weight Parameters</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ weight: initialWeights }}
      >
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {parameters.map((param, index) => (
              <Form.Item
                key={param}
                label={`${param} Weight`}
                name={['weight', param]}
                rules={[
                  { required: true, message: `Masukkan weight untuk ${param}` },
                  {
                    validator: (_, value) =>
                      value >= 1 && value <= 100
                        ? Promise.resolve()
                        : Promise.reject('Weight harus antara 1 dan 100'),
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
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
}

export default WpMethodPage;
