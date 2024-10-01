// RankedAlternativesTable.js
import React from 'react';
import { Table, Card, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title } = Typography;

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

  // Mendefinisikan kolom untuk tabel
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      sorter: (a, b) => a.rank - b.rank,
      defaultSortOrder: 'ascend',
      width: '10%',
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
      title: 'Parameter Values',
      dataIndex: 'parameterValues',
      key: 'parameterValues',
      render: (values) => values.join(', '),
      width: '30%',
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

  const columnsParameters = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Parameters Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Weight',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount.localeCompare(b.amount),
      width: '10%',
    },
  ];

  return (
    <Card style={{ margin: '20px' }} bordered={false}>
      <Title level={3}>Ranked Alternatives</Title>
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
      <Title level={3}>Parameters</Title>
      <Table
        columns={columnsParameters}
        dataSource={data.parameters.map((item, index) => ({
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
