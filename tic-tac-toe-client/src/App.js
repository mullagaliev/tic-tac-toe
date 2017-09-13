import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.sass';
import { Grid, Image, Segment, Icon, Form, Input, Label, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Players from './components/Players/Players';
import GameField from './components/Field/Field';


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
          <Icon className={'b-top-nav__button '} name='repeat' size="large" color="white"/>
        </button>
      </div>
      <div className="b-content b-game">
        <div className="b-game-interface__settings">
          <button className="left">
            <Icon name='question circle outline' size="big" color="white"/>
          </button>
          <button className="right">
            <Icon name='volume up' size="big" color="white"/>
          </button>
        </div>
        <div className="b-game-interface__info">
          <Players/>
        </div>
        <div className="b-game-interface__field">
          <div className="b-game-field">
            <GameField />
          </div>
          <p>
            Hello world!
          </p>
        </div>
      </div>
      <div className="b-footer">
        <Form>
          <Form.Field>
            <Input labelPosition='right' type='text' placeholder='Amount'>
              <Label basic>Message:</Label>
              <input />
              <Label>
                <Button icon='send' />
                { /* icon={<Icon  inverted circular link />} */ }
              </Label>
            </Input>
          </Form.Field>
        </Form>
      </div>
    </div>
    <div className="right-section">

    </div>
    <Grid>
      <Grid.Row>
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
    return (
      <div className="App">
        <Screen></Screen>
      </div>
    );
  }
}

export default App;
