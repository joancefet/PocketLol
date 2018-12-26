import { createMaterialTopTabNavigator } from "react-navigation"
import Profil from "../Components/Profil"
import Historique from "../Components/Historique"

const MainTabNavigator = createMaterialTopTabNavigator({
    Profil: {
        screen: Profil,
        navigationOptions: {
            title: "Profil",
            style: {
                marginTop: 22,
            }
        }
    },
    Historique: {
        screen: Historique,
        navigationOptions: {
            title: "Historique",
            style: {
                marginTop: 22,
            }
        }   
    },
})

export default MainTabNavigator