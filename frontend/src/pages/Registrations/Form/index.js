import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, addMonths, format } from 'date-fns';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import Button from '~/components/Button';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';

import { Container, BackButton } from './styles';

export default function RegistrationForm({ history, match }) {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({});
  const [student, setStudent] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const id = useMemo(() => match.params.id, [match.params.id]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`plans`);

      const data = response.data.map(p => {
        return {
          value: p.id,
          label: p.title,
          duration: p.duration,
          price: p.price,
        };
      });

      setPlans(data);
    }

    loadPlans();
  }, []);

  useEffect(() => {
    async function loadRegistration() {
      const response = await api.get(`registrations/${id}`);

      const data = {
        student: {
          value: response.data.student_id,
          label: response.data.Student.name,
        },
        plan: {
          value: response.data.plan_id,
          label: response.data.Plan.title,
          duration: response.data.Plan.duration,
          price: response.data.Plan.price,
        },
        start_date: parseISO(response.data.start_date),
      };

      setStudent(data.student);
      setPlan(data.plan);
      setStartDate(data.start_date);
    }
    if (id) {
      loadRegistration();
    }
  }, [id]);

  useEffect(() => {
    if (plan) {
      const price = formatPrice(
        plan.duration * plan.price > 0 ? plan.duration * plan.price : 0
      );

      if (startDate && plan.duration) {
        const dateFormatted = format(
          addMonths(startDate, plan.duration),
          "dd'/'MM'/'yyyy"
        );

        setEndDate(dateFormatted);
      }

      setTotalPrice(price);
    }
  }, [plan, startDate]);

  async function handleSubmit(data) {
    console.tron.log(data);
    try {
      if (id) {
        await api.put(`/registrations/${id}`, data);

        toast.success('Matrícula atualizada com sucesso!');

        history.push(`/registrations/form/${id}`);
      } else {
        const response = await api.post('/registrations', data);

        const responseId = response.data.id;

        toast.success('Matrícula cadastrada com sucesso!');

        history.push(`/registrations/form/${responseId}`);
      }
    } catch (err) {
      toast.error('Verifique os dados informados!');
    }
  }

  async function loadOptionStudents(search, cb) {
    const response = await api.get(`students`, {
      params: {
        name: search,
      },
    });

    const data = response.data.map(s => ({
      value: s.id,
      label: s.name,
    }));

    cb(data);
  }

  const selectStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      height: '45px',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused
          ? 'rgb(238, 77, 100, 0.5)'
          : isSelected
          ? '#EE4d64'
          : '#fff',
        color: isSelected ? 'white' : isFocused ? 'white' : '#999',
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? '#EE4d64' : 'rgb(238, 77, 100, 0.5)'),
        },
      };
    },

    input: styles => ({
      ...styles,
      color: '#999',
      height: '19px',
    }),
    placeholder: styles => ({
      ...styles,
      color: 'rgba(153, 153, 153, 0.8)',
    }),
    singleValue: styles => ({ ...styles, color: '#999' }),
  };

  return (
    <Container>
      <header>
        <h1>{id ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h1>
        <aside>
          <BackButton
            type="button"
            onClick={() => history.push('/registrations')}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </BackButton>
          <Button type="submit" form="registration-form">
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </aside>
      </header>
      <Form id="registration-form" onSubmit={handleSubmit}>
        <div className="input-block">
          <Select
            name="student_id"
            label="ALUNO"
            value={student}
            onChange={setStudent}
            styles={selectStyles}
            options={loadOptionStudents}
          />
        </div>
        <div id="input-group">
          <div className="input-block">
            <Select
              styles={selectStyles}
              name="plan_id"
              label="PLANO"
              value={plan}
              options={plans}
              onChange={setPlan}
            />
          </div>
          <div className="input-block">
            <DatePicker
              name="start_date"
              label="INÍCIO"
              selected={startDate}
              onChangeDate={setStartDate}
            />
          </div>
          <div className="input-block">
            <label htmlFor="end_date">TÉRMINO</label>
            <input id="end_date" value={endDate} disabled />
          </div>
          <div className="input-block">
            <label htmlFor="price">VALOR FINAL</label>
            <input id="price" value={totalPrice} disabled />
          </div>
        </div>
      </Form>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

RegistrationForm.defaultProps = {
  history: null,
};
