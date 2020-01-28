import * as Yup from 'yup';

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import Button from '~/components/Button';

import { Container, BackButton } from './styles';

export default function PlanForm({ history, match }) {
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [plan, setPlan] = useState({});

  const schema = Yup.object().shape({
    title: Yup.string().required('O título do plano é obrigatório'),
    duration: Yup.number()
      .typeError('A duração é obrigatória')
      .required('A duração é obrigatória'),
    price: Yup.number()
      .typeError('O preço mensal é obrigatório')
      .required('O preço mensal é obrigatório'),
  });

  const id = useMemo(
    () => ({
      value: match.params.id,
    }),
    [match.params.id]
  );

  const total = useMemo(() => formatPrice(duration * price), [duration, price]);

  useEffect(() => {
    async function loadPlan() {
      const { data } = await api.get(`plans/${id.value}`, {});

      setDuration(data.duration);
      setPrice(data.price);
      setPlan(data);
    }
    loadPlan();
  }, [id.value]);

  async function handleSubmit(data) {
    try {
      if (id.value) {
        await api.put(`/plans/${id.value}`, data);

        toast.success('Plano atualizado com sucesso!');

        history.push(`/plans/form/${id.value}`);
      } else {
        const response = await api.post('/plans', data);

        const planId = response.data.id;

        toast.success('Plano cadastrado com sucesso!');

        history.push(`/plans/form/${planId}`);
      }
    } catch (err) {
      toast.error('Verifique os dados informados!');
    }
  }

  return (
    <Container>
      <header>
        <h1>{id.value ? 'Edição de plano' : 'Cadastro de plano'}</h1>
        <aside>
          <BackButton
            type="button"
            onClick={() => {
              history.push('/plans');
            }}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </BackButton>
          <Button type="submit" form="plan-form">
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </aside>
      </header>
      <Form
        id="plan-form"
        schema={schema}
        initialData={plan}
        onSubmit={handleSubmit}
      >
        <Input name="title" label="TÍTULO DO PLANO" />
        <div>
          <div>
            <Input
              name="duration"
              label="DURAÇÃO(em meses)"
              type="number"
              min={0}
              onChange={e => setDuration(e.target.value)}
            />
          </div>
          <div>
            <Input
              name="price"
              label="PREÇO MENSAL"
              type="number"
              min={0}
              step={0.01}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="total">PREÇO TOTAL</label>
            <input id="total" value={total} disabled />
          </div>
        </div>
      </Form>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

PlanForm.defaultProps = {
  history: null,
};
