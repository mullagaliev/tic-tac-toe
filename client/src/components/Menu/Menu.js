import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Divider, Icon } from 'semantic-ui-react';
import CopyButton from '../../components/common/buttons/CopyButton/CopyButton';
import Authors from '../../components/static/Authors/Authors';
import './MenuScreen.sass';

export class Menu extends React.Component {
  state = {
    connectString: '',
    copied: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onConnect } = this.props;
    const { connectString = '' } = this.state;
    onConnect(connectString);
  };

  handleChange = (e) => this.setState({ connectString: e.target.value });

  render() {
    const { connectString } = this.state;
    const { link = '' } = this.props;
    return <div className="b-menu">
      <h1 className="welcome">
        Welcome!
      </h1>
      <div className="b-logo"/>
      <div className="b-menu__list">
        <div className="b-menu__item">
          <CopyButton text={link}/>
        </div>
        <Divider horizontal className="white">Or</Divider>
        <div className="b-menu__item">
          <form onSubmit={this.handleSubmit}>
            <Input
                fluid
                action={
                  <Button type='submit' color='blue'>
                    Connect
                    <Icon name='chevron right'/>
                  </Button>
                }
                value={connectString}
                placeholder={'http://site.com/roomId or roomId'}
                onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
      <Authors/>
    </div>;
  }
}

Menu.propTypes = {
  link: PropTypes.string,
  onConnect: PropTypes.func
};

Menu.defaultProps = {
  link: null,
  onConnect: () => {

  }
};

export default Menu;
