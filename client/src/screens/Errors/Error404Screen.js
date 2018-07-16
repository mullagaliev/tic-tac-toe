import React, { Component } from 'react';
import Screen from '../../layouts/SimpleScreen';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  line-height: 1.3;
  h1{
    font-size: 50px;
  }
  a{
    text-decoration: underline;
    color: white;
  }
`;

export class Error404Screen extends Component {
  render() {
    return (
        <Screen>
          <ErrorMessage>
            <h1>404</h1>
            <span>Page not found</span>
            <br/>
            <br/>
            <NavLink to='/'>Menu</NavLink>
          </ErrorMessage>
        </Screen>
    );
  }
}

export default Error404Screen;
