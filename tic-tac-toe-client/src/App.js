import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.sass';
import _ from 'lodash';
import { Grid, Image, Segment, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function GameField() {
  let fieldLength = 4;
  let field = _.times(fieldLength, (i) => {
    return <div className="tr" key={i}>
      { _.times(fieldLength, (j) =>{
        return <div className="td" key={j}>
          <Icon disabled name='repeat' size="large" color="white"/>
        </div>;
      })}
    </div>;
  });
  return <div className="table b-game-field__table b-game-field__inside">
    {field}
  </div>;
}

function Screen() {
  return <div className="Screen">
    <div className="left-section">
      <div className="chk">
        <img src="bg.jpg" alt=""/>
      </div>
      <div className="b-top-nav">
        <button className="b-top-nav__button left">
          <Icon name='arrow left' size="large" color="white"/>
        </button>
        <span className="c-level">
          <Icon name='star' size="large" color="white"/>
          <span className="c-level__title">Level 4</span>
        </span>
        <button className="b-top-nav__button right">
          <Icon className={'b-top-nav__button '} disabled name='repeat' size="large" color="white"/>
        </button>
      </div>
      <div className="b-content b-game">
        <button className="left">
          <Icon name='heartbeat' size="big" color="white"/>
        </button>
        <button className="right">
          <Icon name='volume up' size="big" color="white"/>
        </button>
        <div className="b-game-interface__info">
          <p>
            Hello world!
          </p>
        </div>
        <div className="b-game-interface__field">
          <div className="b-game-field">
            <GameField></GameField>
          </div>
          <p>
            Hello world!
          </p>
        </div>
      </div>
      <div className="b-footer">
        <p>
          Hello world!
        </p>
      </div>
    </div>
    <div className="right-section">

    </div>
    <Grid>
      <Grid.Row colums={2}>
        <Grid.Column largeScreen={12} mobile={16}>
          <Segment>
            <Image src='/assets/images/wireframe/media-paragraph.png'/>
            Large Screen
          </Segment>
        </Grid.Column>
        <Grid.Column largeScreen={4} only='large screen'>
          <Segment>Large Screen</Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>;
}


class App extends Component {
  render() {
    console.log(GameField());
    return (
      <div className="App">
        <Screen></Screen>
      </div>
    );
  }
}

export default App;
