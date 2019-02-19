import { createMaterialTopTabNavigator } from 'react-navigation';
import Profil from '../Components/Profil';
import Historique from '../Components/Historique';
import Initial from '../Components/index';

const MainTabNavigator = createMaterialTopTabNavigator({
  Profil: {
    screen: Profil,
    navigationOptions: {
      title: 'Profil',
      style: {
        marginTop: 22,
      },
    },
  },
  Historique: {
    screen: Historique,
    navigationOptions: {
      title: 'Historique',
      style: {
        marginTop: 22,
      },
    },
  },
  Initial: {
    screen: Initial,
    navigationOptions: {
      title: 'Account',
      style: {
        marginTop: 22,
      },
    },
  },
});

export default MainTabNavigator;
