import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';

import Button from '~/components/Button';
import Pagination from '~/components/Pagination';

import { Container, Content, Table } from './styles';

export default function Registrations({ history }) {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registrations', {
        params: {
          page,
        },
      });

      const data = response.data.map(r => {
        const startDateFormatted = format(
          parseISO(r.start_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );
        const endDateFormatted = format(
          parseISO(r.end_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );

        return {
          ...r,
          startDateFormatted,
          endDateFormatted,
        };
      });

      setRegistrations(data);
    }

    loadRegistrations();
  }, [page]);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir esse registro?')) {
      try {
        await api.delete(`registrations/${id}`);

        const newList = registrations.filter(registration => {
          return registration.id !== id;
        });

        setRegistrations(newList);
        toast.success('Matrícula excluída com sucesso');
      } catch (err) {
        toast.error('Não foi possível excluir esta matrícula');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>
        <Button
          type="button"
          onClick={() => {
            history.push('registrations/form');
          }}
        >
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </Button>
      </header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={String(registration.id)}>
                <td>{registration.Student.name}</td>
                <td>{registration.Plan.title}</td>
                <td>{registration.startDateFormatted}</td>
                <td>{registration.endDateFormatted}</td>
                <td>
                  <MdCheckCircle
                    color={registration.active ? '#42CB59' : '#ddd'}
                    size={20}
                  />
                </td>
                <td>
                  <Link to={`registrations/form/${registration.id}`}>
                    editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(registration.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
      <Pagination page={page} setPage={setPage} />
    </Container>
  );
}

Registrations.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Registrations.defaultProps = {
  history: null,
};
