import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.profile.name);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <label>
            <img src={logo} alt="gympoint" />
            GYMPOINT
          </label>
          <ul>
            <li>
              <NavLink to="/students">ALUNO</NavLink>
            </li>
            <li>
              <NavLink to="/plans">PLANOS</NavLink>
            </li>
            <li>
              <NavLink to="/registrations">MATRÍCULAS</NavLink>
            </li>
            <li>
              <NavLink to="/help-orders">PEDIDOS DE AUXÍLIO</NavLink>
            </li>
          </ul>
        </nav>

        <aside>
          <strong>{name}</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
