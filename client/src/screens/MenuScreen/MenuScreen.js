import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import { MenuContainer } from '../../containers/Menu';

export const MenuScreen = () =>{
  return <Screen classBgName={'BgImage BgBlur'}>
    <MenuContainer/>
  </Screen>;
};

export default MenuScreen;
