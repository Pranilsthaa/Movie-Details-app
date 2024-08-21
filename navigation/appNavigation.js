/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import MovieScreen from '../Screens/MovieScreen';
import CastDetailScreen from '../Screens/CastScreen';
import SearchScreen from '../Screens/SearchScreen';

function AppNavigation() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false, headerStyle: { backgroundColor: '#1e201d' }, headerTintColor: 'white' }}
                />
                <Stack.Screen
                    name="Movie"
                    component={MovieScreen}
                    options={{ headerShown: false, headerStyle: { backgroundColor: '#1e201d' }, headerTintColor: 'white' }}
                />
                <Stack.Screen
                    name="Cast"
                    component={CastDetailScreen}
                    options={{ headerShown: false, headerStyle: { backgroundColor: '#1e201d' }, headerTintColor: 'white' }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false, headerStyle: { backgroundColor: '#1e201d' }, headerTintColor: 'white' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
