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

    if (values.method === 'SAW' || values.method === 'TOPSIS') {
      navigate('/weight-direct-method', { state: { 
        parameters: parameters,
      } });
    } else {
      // Handle untuk metode lain atau default halaman
      navigate('/another-method-page', { state: { method: values.method } });
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
