import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import Button from '~/components/Button';
import Pagination from '~/components/Pagination';

import { Container, Content, Table } from './styles';

export default function Plans({ history }) {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(0);

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('plans', {
        params: {
          page,
        },
      });

      const planArray = data.plans.map(plan => {
        const formatedPrice = formatPrice(plan.price);

        const amountMonths =
          plan.duration > 1 ? `${plan.duration} meses` : `${plan.duration} mês`;

        return {
          id: plan.id,
          title: plan.title,
          amountMonths,
          formatedPrice,
        };
      });

      setRowsCount(data.count);
      setPlans(planArray);
    }

    loadPlans();
  }, [page]);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir esse registro?')) {
      try {
        await api.delete(`plans/${id}`);

        const newList = plans.filter(plan => {
          return plan.id !== id;
        });

        setPlans(newList);
        toast.success('Plano excluído com sucesso');
      } catch (err) {
        toast.error('Não foi possível excluir este plano');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <Button
          type="button"
          onClick={() => {
            history.push('plans/form');
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
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR / MÊS</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={String(plan.id)}>
                <td>{plan.title}</td>
                <td>{plan.amountMonths}</td>
                <td>{plan.formatedPrice}</td>
                <td>
                  <Link to={`/plans/form/${plan.id}`}>editar</Link>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
                    apagar
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

Plans.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Plans.defaultProps = {
  history: null,
};
