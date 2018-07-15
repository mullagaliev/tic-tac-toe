import React from 'react';
import styled from 'styled-components';
import { Icon, Popup } from 'semantic-ui-react';

const SpinnerStyled = styled.div`
  position: absolute;
  bottom: -35px;
  left: 0;
  right: 0;
  margin: 0 30px;
  height: 30px;
  text-align: left;
  .c-spinner{
    position: absolute;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    transition: all 1s cubic-bezier(.62,0,.33,1);
    background-color: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    left: ${({ isYour }) => isYour ? '0' : '150px'};
    .icon{
      color: ${({ isYour, myColor, enemyColor }) => isYour ? myColor : enemyColor} !important;
    }
  }
`;

export const Spinner = (props) => {
  const { isYour, myMarker } = props;
  const colors = {
    myColor: myMarker === 'x' ? '#EC607D' : '#57B2DF',
    enemyColor: myMarker !== 'x' ? '#EC607D' : '#57B2DF'
  };
  return <SpinnerStyled {...props} {...colors}>
    <Popup
        trigger={<div className="c-spinner">
          <Icon loading name='spinner' size="big" color="white"/>
        </div>}
        content={isYour ? 'Ваш ход' : 'Игрок думает'}
        position='top center'
    />
  </SpinnerStyled>;
};

export default Spinner;
