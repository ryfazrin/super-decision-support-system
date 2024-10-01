// InvestasiPage.js
import React, { useState, useEffect } from 'react';
import { Form, Slider, Button, message, Typography, Card, Space, Spin } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';

const { Title, Text } = Typography;

// Fungsi untuk mengambil data dari API
const fetchInvestasiParameters = async () => {
  const response = await axiosInstance.get('/public/dss/investasi'); // Ganti dengan endpoint API Anda
  return response.data.data.parameters;
};

// Fungsi untuk mengirim data ke server
const postInvestasiData = async (data) => {
  const response = await axiosInstance.post('/public/dss/investasi', data); // Ganti dengan endpoint API Anda
  return response.data; // Pastikan ini adalah data yang dapat dikloning
};

// Mapping untuk rangeLabel berdasarkan nama parameter
const rangeLabelMapping = {
  "Jangka Waktu": { min: "1", max: "100" },
  "Return Value": { min: "1", max: "100" },
  "Tingkat Likuiditas": { min: "1", max: "100" },
  "Modal": { min: "1", max: "100" },
  "Pajak": { min: "1", max: "100" },
  "Tingkat Resiko": { min: "1", max: "100" },
};

const InvestasiPage = () => {
  const navigate = useNavigate();

  // Mengambil data parameter dari API menggunakan useQuery
  const { data, isLoading, isError, error } = useQuery(['investasiParameters'], fetchInvestasiParameters);

  // Menggunakan React Query untuk menangani mutasi data
  const { mutate, isLoading: isSubmitting } = useMutation(postInvestasiData, {
    onSuccess: (data) => {
      message.success('Data berhasil dikirim!');
      navigate('/result', { state: { data } });
    },
    onError: (error) => {
      message.error(`Gagal mengirim data: ${error.message}`);
    }
  });

  // Inisialisasi form dengan nilai awal
  const [form] = Form.useForm();

  // State untuk menyimpan nilai sliders
  const [sliders, setSliders] = useState({});

  // State untuk menyimpan sisa total yang tersedia
  const [remainingTotal, setRemainingTotal] = useState(100);

  useEffect(() => {
    if (data) {
      const initialSliders = {};
      data.forEach(param => {
        initialSliders[param.code] = 1; // Nilai awal minimal 1
      });
      setSliders(initialSliders);
      setRemainingTotal(100 - Object.keys(initialSliders).length); // 100 - N*1
      form.setFieldsValue({
        sliders: initialSliders,
      });
    }
  }, [data, form]);

  // Handler untuk perubahan slider
  const handleSliderChange = (value, paramCode) => {
    const previousValue = sliders[paramCode] || 1;
    const newSliders = { ...sliders, [paramCode]: value };
    const total = Object.values(newSliders).reduce((sum, val) => sum + val, 0);
    const newRemaining = 100 - total;

    setSliders(newSliders);
    setRemainingTotal(newRemaining >= 0 ? newRemaining : 0);

    form.setFieldsValue({ sliders: newSliders });
  };

  // Handler untuk submit form
  const onFinish = (values) => {
    console.log('Form Values:', values);

    // Menghitung total untuk memastikan validasi
    const total = Object.values(values.sliders).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      message.error(`Total nilai slider harus sama dengan 100. Saat ini: ${total}`);
      return;
    }

    // Transformasi data ke format yang diinginkan
    const transformedData = {
      parameters: data.map(param => ({
        code: param.code,
        name: param.name,
        amount: values.sliders[param.code]
      }))
    };

    console.log('Transformed Data:', transformedData);

    // Kirim data ke API
    mutate(transformedData);
  };

  if (isLoading) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin tip="Memuat data..." size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: 24 }}>
        <Title level={3}>Terjadi Kesalahan</Title>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Investasi Parameters Input</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {data.map((param) => (
              <div key={param.code} style={{ marginBottom: 24 }}>
                <Title level={5}>{param.name}</Title>
                <Form.Item
                  label={`Nilai (${rangeLabelMapping[param.name]?.min || "1"} - ${rangeLabelMapping[param.name]?.max || "100"})`}
                  name={['sliders', param.code]}
                  rules={[
                    { required: true, message: `Masukkan nilai untuk ${param.name}` },
                    {
                      type: 'number',
                      min: 1,
                      max: 100,
                      message: `Nilai harus antara 1 dan 100`
                    }
                  ]}
                >
                  <Slider
                    min={1}
                    max={100}
                    marks={{
                      1: "1",
                      100: "100",
                    }}
                    value={sliders[param.code]}
                    onChange={(value) => handleSliderChange(value, param.code)}
                  />
                </Form.Item>
                <Text>Nilai: {sliders[param.code]}</Text>
              </div>
            ))}
          </Space>
        </Card>

        <div style={{ marginBottom: 24 }}>
          <Title level={5}>Total Nilai Slider: {Object.values(sliders).reduce((sum, val) => sum + val, 0)} / 100</Title>
          {Object.values(sliders).reduce((sum, val) => sum + val, 0) !== 100 && (
            <Typography.Text type="danger">Total nilai slider harus sama dengan 100.</Typography.Text>
          )}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={Object.values(sliders).reduce((sum, val) => sum + val, 0) !== 100}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InvestasiPage;
