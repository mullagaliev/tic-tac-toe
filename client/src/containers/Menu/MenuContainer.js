import { connect } from 'react-redux';
import { connectToRoom } from '../../redux/actions';
import { Menu } from '../../components/Menu';

const mapStateToProps = (state) => {
  return {
    link: state.room.link
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onConnect: (url) => {
      const roomIdForConnect = url.split('/').slice(-1)[0];
      const cb = () => {
      };
      dispatch(connectToRoom(roomIdForConnect, cb));
    }
  };
};

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default MenuContainer;
