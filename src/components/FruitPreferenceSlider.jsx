import React, { useState } from 'react';
import { Form, Button, Typography, Slider, Row, Col } from 'antd';
const { Text } = Typography;

function PreferenceForm() {
  const [form] = Form.useForm();
  
  const marks = {
    1: { label: <strong>Durian Sangat</strong> },
    3: { label: 'Durian Lebih' },
    5: { label: <strong>Netral</strong> },
    7: { label: 'Mangga Lebih' },
    9: { label: <strong>Mangga Sangat</strong> }
  };

  const onSubmit = (values) => {
    console.log('Received values from form:', values);
    // Submit values to server or another handler
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item name="fruitPreference" label="Preferensi Buah" initialValue={5}>
        <Slider
          min={1}
          max={9}
          marks={marks}
          step={null}
          tooltipVisible={false}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default PreferenceForm;
