import { useState } from 'react';
import { Input, Button, Select, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function DecisionPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [method, setMethod] = useState('');

  const onFinish = (values) => {
    // Gunakan navigate untuk mengirim data ke WPMethodPage
    const parameters = values.parameters.map((param, index) => ({
      id: `param-${index}`, // Membuat ID unik berdasarkan index
      content: param.parameter // Menggunakan input pengguna
    }));

    const newValues = {
      ...values,
      parameters,
    };

    console.log(newValues);

    if (values.method === 'SAW' || values.method === 'TOPSIS') {
      navigate('/weight-direct-method', { state: { 
        values: newValues,
      }});
    } else if (values.method === 'WP') {
      navigate('/weight-wp-method', { state: { 
        values: newValues,
      }});
    } else if (values.method === 'AHP') {
      const parameters = values.parameters;

      navigate('/weight-ahp-method', { state: { parameters } });

      // // Buat marks berdasarkan jumlah parameter dan distribusikan secara proporsional
      // const marks = {};
      // const step = 100 / (parameters.length - 1); // Bagi 100 sesuai jumlah parameter
      // parameters.forEach((param, index) => {
      //   marks[Math.round(step * index)] = {
      //     label: param,
      //     value: index + 1 // Nilai object berdasarkan urutan
      //   };
      // });

      // // Navigasi ke halaman slider dengan marks yang dibuat
      // navigate('/weight-ahp-method', { state: { 
      //   marks,
      // }});
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Topik" name="topik" rules={[{ required: true, message: 'Topik harus diisi!' }]}>
        <Input placeholder="Masukkan topik" />
      </Form.Item>

      <Form.List name="parameters">
        {(fields, { add, remove }) => (
          <>
            <Form.Item label="Parameter">
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Tambah Parameter
              </Button>
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'parameter']}
                  rules={[{ required: true, message: 'Parameter tidak boleh kosong' }]}
                >
                  <Input placeholder="Nama Parameter" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
          </>
        )}
      </Form.List>

      <Form.List name="alternatives">
        {(fields, { add, remove }) => (
          <>
            <Form.Item label="Alternatif">
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Tambah Alternatif
              </Button>
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'alternative']}
                  rules={[{ required: true, message: 'Alternatif tidak boleh kosong' }]}
                >
                  <Input placeholder="Nama Alternatif" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item label="Pilih Metode" name="method" rules={[{ required: true, message: 'Metode harus dipilih!' }]}>
        <Select placeholder="Pilih metode">
          <Option value="SAW">SAW</Option>
          <Option value="WP">WP</Option>
          <Option value="topsis">TOPSIS</Option>
          <Option value="AHP">AHP</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DecisionPage;
