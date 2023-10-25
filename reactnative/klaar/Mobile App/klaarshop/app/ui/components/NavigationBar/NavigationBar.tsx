import React, { memo } from 'react';
import {
   TouchableOpacity,
   View
} from 'react-native';
import DialogsIcon from '~/screens/MainScreen/assets/DialogsIcon';
import { RoutesT } from '~/screens/MainScreen/MainScreen';
import { useThemeContext } from '~/ui/theme';
import SearchIcon from '../SearchInput/assets/search';
import HomeIcon from './assets/home';
import HomeSelectedIcon from './assets/homeSelected';
import ProfileIcon from './assets/profile';
import ProfileSelectedIcon from './assets/profileSelected';
import SellIcon from './assets/sell';
import SellSelectedIcon from './assets/sellSelected';
import { createStyle } from './NavigationBarStyles';

export type NavigationBarProps = {
   route: RoutesT
   onSelect: (text: RoutesT) => void;
};


const NavigationBar: React.FC<NavigationBarProps> = ({
   route,
   onSelect
}) => {

   const { s } = useThemeContext(createStyle);

   return (
      <View style={[s?.barContainer]}>
         <TouchableOpacity onPress={() => onSelect('home')}>
            {route === 'home' ? <HomeSelectedIcon w={25} h={25} /> : <HomeIcon w={25} h={25} />}
         </TouchableOpacity>
         {/* <TouchableOpacity onPress={() => onSelect('popular')}>
            <PopularIcon isActive={route === 'popular'} />
         </TouchableOpacity>  */}
         <TouchableOpacity onPress={() => onSelect('search')} >
            {route === 'search' ? <SearchIcon isNav isActive w={26} h={26} /> : <SearchIcon isNav w={26} h={26} />}
         </TouchableOpacity>
         <TouchableOpacity onPress={() => onSelect('sell')} >
            {route === 'sell' ? <SellSelectedIcon w={30} h={30} /> : <SellIcon w={30} h={30} />}
         </TouchableOpacity>
         <TouchableOpacity onPress={() => onSelect('notifications')}>
            <DialogsIcon isActive={route === 'notifications'} />
         </TouchableOpacity>
         <TouchableOpacity onPress={() => onSelect('profile')}>
            {route === 'profile' ? <ProfileSelectedIcon w={24} h={24} /> : <ProfileIcon w={24} h={24} />}
         </TouchableOpacity>
      </View>
   );
};




NavigationBar.defaultProps = {

}


const NavigationBarM = memo(NavigationBar);
export { NavigationBarM as NavigationBar };
