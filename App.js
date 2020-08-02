import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux'
import Store from './Store/ConfigureStore'
import Navigation from './Component/Navigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App(props) {
   return (
    <Provider store= {Store}>
      <Navigation/>
    </Provider>
  );
}


