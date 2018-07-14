import React from 'react';
import PropTypes from 'prop-types';
import Screen from '../../layouts/SimpleScreen';
import { Input, Button, Divider, Icon } from 'semantic-ui-react';
import CopyButton from '../../components/common/buttons/CopyButton/CopyButton';
import Authors from '../../components/static/Authors/Authors';
import './MenuScreen.sass';

export class MenuScreen extends React.Component {
  state = {
    connectString: '',
    copied: false
  };

  render() {
    return <Screen classBgName={'BgImage BgBlur'}>
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
        <Authors/>
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

