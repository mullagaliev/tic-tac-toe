import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const AuthorContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .b-authors-item{
    width: 50px;
    background-color: rgba(255, 255, 255, 0.74);
    transition: all 0.33s;
    padding: 10px 0;
    &:hover{
      border-radius: 10px;
    }
    .icon{
      margin: 0 !important
    }
  }
`;

class Authors extends Component {
  render() {
    return (
        <AuthorContainer>
          <a className='b-authors-item' href="https://dribbble.com/shots/2841696-X-O-Game-Design"
             target="_blank">
            <Icon name='dribble' size='big'/>
          </a>
          <a className='b-authors-item' href="https://github.com/mullagaliev" target="_blank">
            <Icon name='github' size='big'/>
          </a>
          <a className='b-authors-item' href="https://mullagaliev.com/" target="_blank">
            <Icon name='rocket' size='big'/>
          </a>
          <NavLink className='b-authors-item' to="/manual">
            <Icon name='question' size='big'/>
          </NavLink>
        </AuthorContainer>
    );
  }
}

export default Authors;
