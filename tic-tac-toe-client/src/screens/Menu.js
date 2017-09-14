import React from 'react';
import { Screen } from './Screen';
import { Input, Button, Divider, Icon, Grid } from 'semantic-ui-react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = { link: 'http://ww.short.url/c0opq', copied: false };
  }
  render() {
    return <Screen
      active={ this.props.active }
      blurBg={true}
      content={
        <div className="b-menu">
          <h1 className="welcome">
           Welcome!
          </h1>
          <div className="b-logo">
            <img src="icon.png" alt=""/>
          </div>
          <div className="b-menu__list">
            <div className="b-menu__item">
              <CopyToClipboard text={this.state.link}
                onCopy={() => {
                  this.setState({ copied: true });
                  setTimeout(() => { this.setState({ copied: false }); }, 3000);
                }
                }>
                <Button fluid primary animated='vertical'>
                  <Button.Content visible>
                    <Icon name='linkify' />
                    {this.state.link}
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='copy' />
                    <span> {(this.state.copied ? 'Copied' : 'Copy')}</span>
                  </Button.Content>
                </Button>
              </CopyToClipboard>
            </div>
            <Divider horizontal className="white">Or</Divider>
            <div className="b-menu__item">
              <Input
                fluid
                action={{ color: 'blue', labelPosition: 'right', icon: 'chevron right', content: 'Connect ' }}
                defaultValue=''
              />
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

export { Menu };
