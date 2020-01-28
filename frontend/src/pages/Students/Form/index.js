import * as Yup from 'yup';
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Button from '~/components/Button';

import { Container, BackButton } from './styles';

export default function StudentForm({ history, match }) {
  const [student, setStudent] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email()
      .required('O e-mail é obrigatório'),
    age: Yup.number()
      .typeError('A idade é obrigatória')
      .required('A idade é obrigatória'),
    weight: Yup.number()
      .typeError('O peso é obrigatório')
      .required('O peso é obrigatório'),
    height: Yup.number()
      .typeError('A altura é obrigatória')
      .required('A altura é obrigatória'),
  });

  const id = useMemo(
    () => ({
      value: match.params.id,
    }),
    [match.params.id]
  );

  useEffect(() => {
    async function loadStudent() {
      const { data } = await api.get(`students/${id.value}`, {});

      setStudent(data);
    }
    loadStudent();
  }, [id.value]);

  async function handleSubmit(data) {
    try {
      if (id.value) {
        await api.put(`/students/${id.value}`, data);

        toast.success('Aluno atualizado com sucesso!');

        history.push(`/students/form/${id.value}`);
      } else {
        const response = await api.post('/students', data);

        const studentId = response.data.id;

        toast.success('Aluno cadastrado com sucesso!');

        history.push(`/students/form/${studentId}`);
      }
    } catch (err) {
      toast.error('Verifique os dados informados!');
    }
  }

  return (
    <Container>
      <header>
        <h1>{id.value ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
        <aside>
          <BackButton
            type="button"
            onClick={() => {
              history.push('/students');
            }}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </BackButton>
          <Button type="submit" form="student-form">
            <MdCheck size={20} color="#fff" />
            SALVAR
          </Button>
        </aside>
      </header>
      <Form
        id="student-form"
        schema={schema}
        initialData={student}
        onSubmit={handleSubmit}
      >
        <Input name="name" label="ALUNO" />
        <Input name="email" label="ENDEREÇO DE E-MAIL" type="email" />
        <div>
          <div>
            <Input name="age" label="IDADE" min={0} max={999} type="number" />
          </div>
          <div>
            <Input
              name="weight"
              label="PESO(em kg)"
              min={0}
              max={999.99}
              step={0.01}
              type="number"
            />
          </div>
          <div>
            <Input
              name="height"
              label="ALTURA"
              min={0}
              max={9.99}
              step={0.01}
              type="number"
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

StudentForm.defaultProps = {
  history: null,
};
