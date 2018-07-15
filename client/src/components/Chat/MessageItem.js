import React, { Component } from 'react';
import styled from 'styled-components';

const MessageContent = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  &:before{
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 14px solid transparent;
    border-bottom-color: #e8e8e8;
    left: ${props => props.your ? '-10px' : 'initial'}
    right: ${props => props.your ? 'initial' : '-10px'}
    bottom: 0;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  display: inline-block;
  background-color: #e8e8e8;
  box-sizing: border-box;
  padding: 8px 15px 10px;
  font-size: .95em;
  text-align: left;
  color: #222;
`;

const MessageTitle = styled.span`
  opacity: .45;
  display: block;
  margin-bottom: 2px;
  font-size: .85em;
  font-weight: 700;
`;

const MessageDate = styled.span`
  font-weight: 500;
`;

const MessageText = styled.p`
  color: black;
`;

export class Message extends Component {
  render() {
    const { item } = this.props;
    return (
        <MessageContent your={item.isYour}>
          <MessageContainer>
            <MessageTitle>
              <span>from <i>{item.name ? item.name : '???'}</i></span> <MessageDate>{item.date ? (new Date(item.date)).toLocaleTimeString() : ''}</MessageDate>
            </MessageTitle>
            <MessageText>
              {item.message}
            </MessageText>
          </MessageContainer>
        </MessageContent>
    );
  }
}

Message.propTypes = {};
Message.defaultProps = {};

export default Message;
