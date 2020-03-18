import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Pagination from '~/components/Pagination';

import {
  Container,
  Content,
  Table,
  BackgroundModal,
  ContainerModal,
  HeaderModal,
  FormModal,
  SubmitButton,
} from './styles';

export default function HelpOrders() {
  const [answerModal, setAnswerModal] = useState({});
  const [helpOrders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(0);

  function showModal({ helpOrder }) {
    setAnswerModal({ helpOrder, show: true });
  }

  function hideModal() {
    setAnswerModal({ helpOrder: null, show: false });
  }

  useEffect(() => {
    async function loadHelpOrders() {
      const { data } = await api.get('help-orders', {
        params: {
          page,
        },
      });

      console.tron.log(data.count);
      console.tron.log(data.helpOrders);

      setRowsCount(data.count);
      setHelpOrders(data.helpOrders);
    }

    loadHelpOrders();
  }, [page]);

  async function handleSubmit({ answer }, { resetForm }) {
    try {
      await api.post(`help-orders/${answerModal.helpOrder.id}/answer`, {
        answer,
      });

      toast.success('Resposta enviada!');

      const newList = helpOrders.filter(helpOrder => {
        return helpOrder.id !== answerModal.helpOrder.id;
      });

      resetForm({ answer: '' });

      setHelpOrders(newList);

      hideModal();
    } catch (err) {
      toast.error('Falha no envio, Tente novamente mais tarde.');

      resetForm({ answer: '' });

      hideModal();
    }
  }

  return (
    <Container>
      <header>
        <h1>Pedidos de auxílio</h1>
      </header>
      <BackgroundModal show={answerModal.show}>
        <ContainerModal>
          <HeaderModal>
            <button
              type="button"
              onClick={() => {
                hideModal();
              }}
            >
              <MdClose color="#444" size={20} />
            </button>
          </HeaderModal>
          <FormModal
            initialData={answerModal.helpOrder}
            onSubmit={handleSubmit}
          >
            <span>PERGUNTA DO ALUNO</span>
            <p>{answerModal.helpOrder ? answerModal.helpOrder.question : ''}</p>

            <span>SUA RESPOSTA</span>
            <Input multiline name="answer" />
            <SubmitButton type="submit">Responder aluno</SubmitButton>
          </FormModal>
        </ContainerModal>
      </BackgroundModal>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helpOrder => (
              <tr key={String(helpOrder.id)}>
                <td>{helpOrder.Student.name}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => showModal({ helpOrder })}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
      <Pagination page={page} count={rowsCount} setPage={setPage} />
    </Container>
  );
}
