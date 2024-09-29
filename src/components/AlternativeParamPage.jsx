import React from 'react';
import { Form, Slider, Button, Card, Space, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AlternativeParametersForm = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // Mengakses data yang diteruskan dari halaman sebelumnya
  const data = location.state;

  if (!data) {
    return (
      <div style={{ padding: 24 }}>
        <Title level={3}>
          Data tidak ditemukan. Kembali ke{' '}
          <a onClick={() => navigate('/')}>Home</a>.
        </Title>
      </div>
    );
  }

  const { parameters, dssAlternativeParameters } = data.values;

  const onFinish = (values) => {
    const transformedDssAlternativeParametersValues = {
      dssAlternativeParameters: dssAlternativeParameters.map((alternative) => ({
        alternativeName: alternative.alternativeName,
        parameterValues: parameters.map((param) => values[alternative.alternativeName][param]),
      })),
    };

    const newValues = {
      ...data.values,
      dssAlternativeParameters: transformedDssAlternativeParametersValues
    }

    if (newValues.method === 'SAW' || newValues.method === 'TOPSIS') {
      navigate('/weight-direct-method', { state: { 
        values: newValues,
      }});
    } else if (newValues.method === 'WP') {
      navigate('/weight-wp-method', { state: { 
        values: newValues,
      }});
    } else if (newValues.method === 'AHP') {
      const parameters = newValues.parameters;

      navigate('/weight-ahp-method', { state: { parameters } });
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Input Parameter Alternatif</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {dssAlternativeParameters.map((alternative, index) => (
          <Card
            key={alternative.alternativeName}
            title={`Alternatif: ${alternative.alternativeName}`}
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {parameters.map((param) => (
                <Form.Item
                  key={param}
                  label={param}
                  name={[alternative.alternativeName, param]}
                  rules={[{ required: true, message: `Masukkan nilai untuk ${param}` }]}
                >
                  <Slider
                    defaultValue={1}
                    min={1}
                    max={100}
                    marks={{
                      1: '1',
                      25: '25',
                      50: '50',
                      75: '75',
                      100: '100',
                    }}
                  />
                </Form.Item>
              ))}
            </Space>
          </Card>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AlternativeParametersForm;
