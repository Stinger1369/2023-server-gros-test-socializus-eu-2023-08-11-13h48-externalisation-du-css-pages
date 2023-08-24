
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const TopNavigation = ({ arg }) => {
    return <TopTab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarScrollEnabled: false,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
                backgroundColor: "#59C09B",
                borderRightWidth: 2,
                borderRightColor: "white"
            },

            tabBarLabelStyle: {
                fontSize: 18, fontWeight: "bold", textTransform: "none"
            },
            tabBarActiveBackgroundColor: "#59C09B",
            tabBarInactiveBackgroundColor: "gray",

        }}

    >
        {arg.map((screen) => {
            return <TopTab.Screen
                key={1}
                name={`${screen.link}`}
                options={{
                    tabBarLabel: screen.link,

                    tabBarItemStyle: { borderRightWidth: 1, borderRightColor: "white" },

                }}
            >
                 {(props) => screen.to(props)}

                {/* {() => (
                    <Stack.Navigator>
                        <Stack.Screen
                            name={screen.link}
                            options={{
                                headerShown: false,

                            }}
                        >

                            {(props) => screen.to(props)}

                        </Stack.Screen>
                    </Stack.Navigator>
                )} */}
               
            </TopTab.Screen>

        })}
    </TopTab.Navigator>
}

export default TopNavigation