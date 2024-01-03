import React, { useState, useEffect } from 'react';

import CTA from '../components/CTA';
import InfoCard from '../components/Cards/InfoCard';
import ChartCard from '../components/Chart/ChartCard';
import { Doughnut, Line } from 'react-chartjs-2';
import ChartLegend from '../components/Chart/ChartLegend';
import PageTitle from '../components/Typography/PageTitle';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons';
import RoundIcon from '../components/RoundIcon';
import response from '../utils/demo/tableData';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@windmill/react-ui';

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData';

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCall, setNewCall] = useState({
    name: '',
    description: '',
    status: 'open',
    date: new Date().toISOString(),
  });

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  const handleCreateCall = () => {
    setData([newCall, ...data]); // Adiciona o novo chamado no início da tabela
    setModalOpen(false); // Fecha o modal após criar o chamado
    setNewCall({
      name: '',
      description: '',
      status: 'open',
      date: new Date().toISOString(),
    });
  };


  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total chamados fechados" value="6.389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Chamados abertos" value="5.490">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Meus chamados" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Abertos por mim" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <div className="flex justify-end mb-2">
          <Button onClick={() => setModalOpen(true)}>Novo Chamado</Button>
        </div>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((call, i) => (
              <TableRow key={i}>
                <TableCell>{call.name}</TableCell>
                <TableCell>{call.description}</TableCell>
                <TableCell>
                  <Badge type={call.status}>{call.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(call.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      {/* Modal para criar novo chamado */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader>Criar Novo Chamado</ModalHeader>
        <ModalBody>
          <div className="mt-4">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={newCall.name}
              onChange={(e) => setNewCall({ ...newCall, name: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={newCall.description}
              onChange={(e) => setNewCall({ ...newCall, description: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              value={newCall.status}
              onChange={(e) => setNewCall({ ...newCall, status: e.target.value })}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCreateCall}>Criar Chamado</Button>
        </ModalFooter>
      </Modal>



      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
