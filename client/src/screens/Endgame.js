import React from 'react';
import Screen from '../layouts/SimpleScreen';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { newGame } from '../api';

export default class Endgame extends React.Component {
  static defaultProps = {
    link: null
  };
  constructor() {
    super();
    this.state = { connectString: '',
      copied: false };
  }
  render() {
    return <Screen
      active={ this.props.active }
      children={
        <div className="b-menu">
          <h1 className="welcome">
            Player {this.props.winnerId} win!
            {}
          </h1>
          <div className="b-logo"></div>
          <div className="b-menu__list">
            <div className="b-menu__item">
              {
                this.props.isHost ? (<Button fluid primary animated='vertical'
                  onClick={()=>{ newGame(this.props.roomId); }}>
                  <Button.Content visible>
                    New Game
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='rocket' />
                  </Button.Content>
                </Button>) : <span>Wait host actions</span>
              }
            </div>
          </div>
          <Grid columns={3}>
            <Grid.Row className="b-author">
              <Grid.Column>
                <a href="https://dribbble.com/shots/2841696-X-O-Game-Design" target="_blank">
                  <div className="b-author__item">
                    <Icon name='dribble' size='big'/>
                  </div>
                </a>
              </Grid.Column>
              <Grid.Column>
                <a href="https://github.com/vray1995" target="_blank">
                  <div className="b-author__item">
                    <Icon name='github' size='big'/>
                  </div>
                </a>
              </Grid.Column>
              <Grid.Column>
                <a href="https://vk.com/vray1995" target="_blank">
                  <div className="b-author__item">
                    <Icon name='vk' size='big'/>
                  </div>
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>}
    />;
  }
}

export { Endgame };
