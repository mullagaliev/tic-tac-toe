import React from 'react';
import { Screen } from './Screen';
import { Input, Button, Divider, Icon, Grid } from 'semantic-ui-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { connect } from '../api';


export default class Menu extends React.Component {
  static defaultProps = {
    link: null
  };
  constructor() {
    super();
    this.state = { connectString: '',
      copied: false };
  }
  connect() {
    connect(this.state.connectString, () =>{
    });
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
          <div className="b-logo"></div>
          <div className="b-menu__list">
            <div className="b-menu__item">
              <CopyToClipboard text={this.props.link}
                onCopy={() => {
                  this.setState({ copied: true });
                  setTimeout(() => { this.setState({ copied: false }); }, 3000);
                }
                }>
                <Button fluid primary animated='vertical'>
                  <Button.Content visible>
                    <Icon name='linkify' />
                    {this.props.link}
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
              <form onSubmit={(e)=>{
                e.preventDefault();
                this.connect();
              }
              }>
                <Input
                  fluid
                  action={
                    <Button type='submit' color='blue'>
                      Connect
                      <Icon name='chevron right'/>
                    </Button>
                  }
                  value={this.state.connectString}
                  placeholder={'http://site.com/roomId or roomId'}
                  onChange={(event)=> this.setState({ connectString: event.target.value })}
                />
              </form>
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
