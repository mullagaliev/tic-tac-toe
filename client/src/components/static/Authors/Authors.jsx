import React, { Component } from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import './Authors.sass';

class Authors extends Component {
  render() {
    return (
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
    );
  }
}

export default Authors;
