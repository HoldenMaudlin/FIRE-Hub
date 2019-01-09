// Package imports
import { createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

// Screen imports
import ToolsScreen from '../Screens/Drawers/ToolsScreen'
import Tool1ScreenMain from '../Screens/Tools/Tools1ScreenMain'
import Tool1ScreenGraph from '../Screens/Tools/Tools1ScreenGraph'
import Tool2ScreenMain from '../Screens/Tools/Tools2ScreenMain'
import Tool2ScreenGraph from '../Screens/Tools/Tools2ScreenGraph'
import AdvancedFireMain from '../Screens/Tools/AdvancedFireMain'
import AdvancedFireGraph from '../Screens/Tools/AdvancedFireGraph'
import MonteCarloMain from '../Screens/Tools/MonteCarloMain'
import MonteCarloGraph from '../Screens/Tools/MonteCarloGraph'

// DESC:
// Stack navigator for tools drawer element
const ToolsNavigator = createStackNavigator({
    // Main tool screen
    ToolsHome: ToolsScreen,

    // Basic FIRE Input screen 
    Tool1Main: Tool1ScreenMain,
    // Basic FIRE Graph screen
    Tool1Graph: Tool1ScreenGraph,

    // Break Even Input screen
    Tool2Main: Tool2ScreenMain,
    // Break Even Graph screen
    Tool2Graph: Tool2ScreenGraph,
    
    // Advance FIRE input screen
    AdvancedFireMain: AdvancedFireMain,
    // Advanced FIRE graph screen
    AdvancedFireGraph: AdvancedFireGraph,

    // Monte Carlo input screen
    MonteCarloMain: MonteCarloMain,
    // Monte Carlo graph screen
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