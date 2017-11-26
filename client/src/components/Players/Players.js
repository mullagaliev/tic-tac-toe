import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import './Players.sass';

class Player extends React.Component {
  render() {
    return (<div
        className={'b-player b-player--' + this.props.position + (this.props.active ? ' current' : '') }
        key={this.props.id}>
      <div className="b-player__name">
        <span>
          { this.props.current ? 'You (' + this.props.name + ')' : this.props.name }
          <br/>
        </span>
      </div>
      <div className="b-player__score">
        {this.props.score}
      </div>
      <div className="b-player__avatar">
        <img
            src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-128.png"
            className="b-player__avatar-image"/>
        <div className="b-player__marker c-mark" value={ this.props.marker }>
          <Icon className="c-mark__x" name='remove' size="big" color="pink"/>
          <Icon className="c-mark__o" name='circle thin' size="big" color="blue"/>
        </div>
      </div>
    </div>);
  }
}

export default class Players extends React.Component {
  static defaultProps = {
    count: 2, // - CountPlayers = 2
    players: [],
    currentPlayerId: null,
    currentPlayerMove: null,
    isHost: null
  };

  constructor() {
    super();
  }

  currentPositionLoader() {
    let position = 1;
    if ((this.props.isHost && this.props.currentPlayerMove !== this.props.currentPlayerId) ||
        (!this.props.isHost && this.props.currentPlayerMove === this.props.currentPlayerId)) {
      position = 2;
    }
    return position;
  }

  render() {
    let players = this.props.players.map((player) => {
      return <Player
          key={ player.id }
          id={ player.id }
          name={ player.name }
          active={ player.id === this.props.currentPlayerMove }
          current={ player.current }
          marker={ player.marker }
          position={ player.isHost ? 'host' : 'client' }
          score={ this.props.scores[player.id] ? this.props.scores[player.id] : 0}
      />;
    });
    return (<div className="b-players">
      <div className="b-players__list">
        {players}
      </div>
      <div className="b-players__current" value={ this.currentPositionLoader() }>
        <Popup
            trigger={<div className="c-current">
              <Icon loading name='spinner' size="big" color="white"/>
            </div>}
            content={ this.props.currentPlayerMove === this.props.currentPlayerId ? 'Ваш ход' : 'Игрок думает' }
            position='top center'
        />
      </div>
    </div>);
  }
}

export { Players };
