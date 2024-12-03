import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from "./dashboard";
import login from './login';
import register from './register';
import statistics from './statistics';
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen name='Dashboard' component={Dashboard}/>
                <Stack.Screen name='register' component={register}/>
                <Stack.Screen name='statistics' component={statistics}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}