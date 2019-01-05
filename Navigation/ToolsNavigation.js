import { createStackNavigator } from 'react-navigation'



import ToolsScreen from '../Screens/Drawers/ToolsScreen'
import Tool1ScreenMain from '../Screens/Tools/Tools1ScreenMain'
import Tool1ScreenGraph from '../Screens/Tools/Tools1ScreenGraph'
import Tool2ScreenMain from '../Screens/Tools/Tools2ScreenMain'
import Tool2ScreenGraph from '../Screens/Tools/Tools2ScreenGraph'
import AdvancedFireMain from '../Screens/Tools/AdvancedFireMain'
import AdvancedFireGraph from '../Screens/Tools/AdvancedFireGraph'
import MonteCarloMain from '../Screens/Tools/MonteCarloMain'
import MonteCarloGraph from '../Screens/Tools/MonteCarloGraph'
import { Icon } from 'react-native-elements'

const ToolsNavigator = createStackNavigator({
    ToolsHome: { 
        screen: ToolsScreen,
    },
    Tool1Main: { 
        screen: Tool1ScreenMain,
    },
    Tool1Graph: Tool1ScreenGraph,
    Tool2Main: Tool2ScreenMain,
    Tool2Graph: Tool2ScreenGraph,
    AdvancedFireMain: AdvancedFireMain,
    AdvancedFireGraph: AdvancedFireGraph,
    MonteCarloMain: MonteCarloMain,
    MonteCarloGraph: MonteCarloGraph,
    },
    {
        initialRouteName: 'ToolsHome',
    }, 
    {
        defaultNavigationOptions: {
            drawerIcon: ({tintColor}) => (
                 <Icon name = 'menu'  style={{size: 24, color: tintColor}}/>
            )
        },
        
    }
)

export default ToolsNavigator