import React from 'react';
import PropTypes from 'prop-types';
import Screen from '../layouts/SimpleScreen';
import { Input, Button, Divider, Icon, Grid } from 'semantic-ui-react';
import CopyButton from '../components/common/buttons/CopyButton/CopyButton';

class MenuScreen extends React.Component {
  state = {
    connectString: '',
    copied: false
  };

  render() {
    return <Screen blurBg={true}>
      <div className="b-menu">
        <h1 className="welcome">
          Welcome!
        </h1>
        <div className="b-logo"/>
        <div className="b-menu__list">
          <div className="b-menu__item">
            <CopyButton text={this.props.link}/>
          </div>
          <Divider horizontal className="white">Or</Divider>
          <div className="b-menu__item">
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.onConnect(this.state.connectString);
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
                  onChange={(event) => this.setState({ connectString: event.target.value })}
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
      </div>
    </Screen>;
  }
}

MenuScreen.propTypes = {
  link: PropTypes.string,
  onConnect: PropTypes.func
};
MenuScreen.defaultProps = {
  link: null,
  onConnect: () => {

  }
};

export default MenuScreen;

