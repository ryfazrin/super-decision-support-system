import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, InputNumber, Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postData = async (data) => {
  return axios.post('https://api.example.com/submit', data);
};

function DirectMethodPage() {
  const location = useLocation();
  const [parameters, setParameters] = useState(location.state.values.parameters);

  const { mutate, isLoading, error } = useMutation(postData, {
    onSuccess: () => {
      message.success('Data berhasil dikirim!');
      // form.resetFields();
    },
    onError: (error) => {
      message.error(`Gagal mengirim data: ${error.message}`);
    }
  });

  const handleChange = (value, index) => {
    const newParameters = [...parameters];
    newParameters[index].percentage = value;
    setParameters(newParameters);
  };

  const handleSubmit = () => {
    console.log(location.state.values);
    const totalPercentage = parameters.reduce((total, param) => total + param.percentage, 0);
    if (totalPercentage === 100) {
      message.success('Total percentage is exactly 100%!');
      // Process further or navigate away
    } else {
      message.error(`Total percentage must equal 100%. Currently: ${totalPercentage}%`);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {parameters.map((param, index) => (
        <Form.Item label={`${param.content} Percentage`} key={param.id}>
          <InputNumber
            min={0}
            max={100}
            defaultValue={param.percentage}
            onChange={(value) => handleChange(value, index)}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
          />
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
}

export default DirectMethodPage;
