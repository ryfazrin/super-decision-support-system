// InvestasiPage.js
import { useState, useEffect } from 'react';
import { Form, Slider, InputNumber, Button, message, Typography, Card, Space } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

// Fungsi untuk mengirim data ke server
const postInvestasiData = async (data) => {
  // Ganti URL dengan endpoint API Anda
  const response = await axios.post('https://api.example.com/investasi', data);
  return response.data; // Pastikan ini adalah data yang dapat dikloning
};

const InvestasiPage = () => {
  const navigate = useNavigate();

  // Data yang diberikan
  const parameters = [
    {
      id: 1,
      paramName: "return uang",
      range: { min: 2, max: 10 },
      rangeLabel: { min: "cepat", max: "lambat" },
    },
    {
      id: 2,
      paramName: "resiko",
      range: { min: 2, max: 10 },
      rangeLabel: { min: "rendah", max: "tinggi" },
    },
    {
      id: 3,
      paramName: "return uang",
      range: { min: 2, max: 10 },
      rangeLabel: { min: "cepat", max: "lambat" },
    },
  ];

  // Menyiapkan nilai awal untuk form
  const initialValues = {
    weights: parameters.reduce((acc, param) => {
      acc[param.id] = 0;
      return acc;
    }, {}),
    sliders: parameters.reduce((acc, param) => {
      acc[param.id] = param.range.min;
      return acc;
    }, {})
  };

  // State untuk mengelola total weight
  const [totalWeight, setTotalWeight] = useState(0);

  // Menggunakan React Query untuk menangani mutasi data
  const { mutate, isLoading } = useMutation(postInvestasiData, {
    onSuccess: (data) => {
      message.success('Data berhasil dikirim!');
      navigate('/result', { state: { data } });
    },
    onError: (error) => {
      message.error(`Gagal mengirim data: ${error.message}`);
    }
  });

  // Handler untuk submit form
  const onFinish = (values) => {
    console.log('Original Form Values:', values);

    // Validasi: total weight harus sama dengan 100
    if (totalWeight !== 100) {
      message.error(`Total weight harus sama dengan 100%. Saat ini: ${totalWeight}%`);
      return;
    }

    // Transformasi data ke format yang diinginkan
    const transformedData = {
      weights: parameters.map(param => ({
        paramName: param.paramName,
        weight: values.weights[param.id]
      })),
      sliders: parameters.map(param => ({
        paramName: param.paramName,
        value: values.sliders[param.id],
        rangeLabel: param.rangeLabel
      }))
    };

    console.log('Transformed Data:', transformedData);

    // Kirim data ke API
    mutate(transformedData);
  };

  // Menghitung total weight setiap kali weights berubah
  const handleWeightChange = (value, paramId) => {
    const newWeights = { ...form.getFieldValue('weights'), [paramId]: value };
    const total = Object.values(newWeights).reduce((sum, weight) => sum + (weight || 0), 0);
    setTotalWeight(total);
  };

  // Mengelola perubahan slider
  const handleSliderChange = (value, paramId) => {
    const newSliders = { ...form.getFieldValue('sliders'), [paramId]: value };
    form.setFieldsValue({ sliders: newSliders });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form]);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Investasi Parameters Input</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {parameters.map((param) => (
              <div key={param.id} style={{ marginBottom: 24 }}>
                <Title level={5}>{param.paramName}</Title>
                <Form.Item
                  label={`Nilai (${param.rangeLabel.min} - ${param.rangeLabel.max})`}
                  name={['sliders', param.id]}
                  rules={[
                    { required: true, message: `Masukkan nilai untuk ${param.paramName}` },
                    {
                      type: 'number',
                      min: param.range.min,
                      max: param.range.max,
                      message: `Nilai harus antara ${param.range.min} dan ${param.range.max}`
                    }
                  ]}
                >
                  <Slider
                    min={param.range.min}
                    max={param.range.max}
                    marks={{
                      [param.range.min]: param.rangeLabel.min,
                      [param.range.max]: param.rangeLabel.max,
                    }}
                    onChange={(value) => handleSliderChange(value, param.id)}
                  />
                </Form.Item>
                <Form.Item
                  label={`Weight (%)`}
                  name={['weights', param.id]}
                  rules={[
                    { required: true, message: `Masukkan weight untuk ${param.paramName}` },
                    {
                      type: 'number',
                      min: 0,
                      max: 100,
                      message: 'Weight harus antara 0 dan 100'
                    }
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) => handleWeightChange(value, param.id)}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </div>
            ))}
          </Space>
        </Card>

        <div style={{ marginBottom: 24 }}>
          <Title level={5}>Total Weight: {totalWeight}%</Title>
          {totalWeight !== 100 && (
            <Typography.Text type="danger">Total weight harus sama dengan 100%.</Typography.Text>
          )}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={totalWeight !== 100}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InvestasiPage;
