import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';

import Button from '~/components/Button';
import Pagination from '~/components/Pagination';

import api from '~/services/api';

import { Container, Content, Table } from './styles';

export default function Students({ history }) {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students', {
        params: {
          page,
          name,
        },
      });

      setStudents(data);
    }

    loadStudents();
  }, [name, page]);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir esse registro?')) {
      try {
        await api.delete(`students/${id}`);

        const newList = students.filter(student => {
          return student.id !== id;
        });

        setStudents(newList);
        toast.success('Aluno excluído com sucesso');
      } catch (err) {
        toast.error('Não foi possível excluir o aluno');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Button
            type="button"
            onClick={() => {
              history.push('students/form');
            }}
          >
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </Button>
          <input
            placeholder="Buscar aluno"
            onChange={e => setName(e.target.value)}
          />
        </aside>
      </header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={String(student.id)}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`/students/form/${student.id}`}>editar</Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
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

Students.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Students.defaultProps = {
  history: null,
};
