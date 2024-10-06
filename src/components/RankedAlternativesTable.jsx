import React from 'react';
import { Table, Card, Typography, Progress, Row, Col } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RankedAlternativesTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mengakses data yang diteruskan melalui navigate
  const { data } = location.state || {};

  // Jika data tidak ditemukan, tampilkan pesan error dan opsi untuk kembali
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

  // Mendefinisikan kolom untuk tabel alternatif
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      sorter: (a, b) => a.rank - b.rank,
      defaultSortOrder: 'ascend',
      width: '5%',
      align: 'center',
    },
    {
      title: 'Alternative Name',
      dataIndex: 'alternativeName',
      key: 'alternativeName',
      sorter: (a, b) => a.alternativeName.localeCompare(b.alternativeName),
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'DSS Point',
      dataIndex: 'dssPoint',
      key: 'dssPoint',
      sorter: (a, b) => a.dssPoint - b.dssPoint,
      render: (point) => point.toFixed(3),
      width: '20%',
      align: 'center',
    },
  ];

  // Style untuk Progress bars
  const progressStyle = { marginBottom: '10px' };

  return (
    <Card style={{ margin: '20px' }} bordered={false}>
      <Title level={3}>Berdasarkan preferensi dalam memilih investasi berikut ini:</Title>

      {/* Menampilkan parameter dan persentasenya */}
      <Row gutter={[16, 16]}>
        {data.parameters.map((param, index) => (
          <Col span={12} sm={24} md={12} key={index}>
            <Text strong>{param.name}:</Text>
            <Progress 
              percent={param.amount} 
              showInfo={false} 
              strokeColor="#1890ff" 
              // style={progressStyle} 
              size={['100%', 20]}
            />
            <Text>{(param.amount).toFixed(0)}%</Text>
          </Col>
        ))}
      </Row>

      <Title level={3}>Maka urutan instrumen investasi yang paling tepat untuk Anda adalah</Title>

      {/* Menampilkan tabel alternatif dengan rank */}
      <Table
        columns={columns}
        dataSource={data.alternativeParameterRanked.map((item, index) => ({
          key: index,
          ...item,
        }))}
        pagination={{ pageSize: 5 }}
        bordered
        rowClassName={(record) => {
          switch(record.rank) {
            case 1:
              return 'rank-1';
            case 2:
              return 'rank-2';
            case 3:
              return 'rank-3';
            default:
              return '';
          }
        }}
      />
    </Card>
  );
};

export default RankedAlternativesTable;
