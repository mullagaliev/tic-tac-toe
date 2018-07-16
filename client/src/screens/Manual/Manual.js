import React, { Component } from 'react';
import Screen from '../../layouts/SimpleScreen';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Message = styled.div`
  padding: 20px 10px;
  max-width: 540px;
  margin: 0 auto;
  color: white;
  line-height: 1.2;
  text-align: left;
  h2{
    text-align: center;
  }
  a{
    text-decoration: underline;
    color: white;
    text-align: center;
  }
`;

export class ManualScreen extends Component {
  render() {
    return (
        <Screen>
          <Message>
            <h2>Начало игры</h2>
            <h3>Для создания игры</h3>
            <ol>
              <li>Нажать кнопку с ссылкой (Теперь ссылка в буфере обмена)</li>
              <li>Отравить ссылку другу</li>
              <li>Дождитесь пока Ваш друг перейдет по ссылке</li>
              <li>Играйте!</li>
            </ol>
            <h3>Для подключения к игре</h3>
            <ul>
              <li>Перейти по ссылке, полученной от хоста</li>
              <li>Вставить ссылку, полученную от хоста, в поле рядом рядом с кнопкой "Connect"</li>
            </ul>
            <h2>Правила</h2>
            <ul>
              <li>Для победы нужно выставить 4 отметки в ряд/столбик/диагональ</li>
              <li>Игроки ходят поочередно</li>
              <li>После каждого раунда происходит смена сторон</li>
            </ul>
            <h2>Прочее</h2>
            <ul>
              <li>Можно использовать чат для общения</li>
            </ul>
            <br/>
            <br/>
            <NavLink to='/'>На главный экран</NavLink>
          </Message>
        </Screen>
    );
  }
}

export default ManualScreen;
