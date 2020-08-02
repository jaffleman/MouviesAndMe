import React from 'react';
import Search from './Search';
import Principale from './Principale';
import Favorites from './Favorites'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeteilsFilm from './DeteilsFilm';
import Tdp from './Tdp'



const Stack = createStackNavigator();
export default function Navigation(props) {
   return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="THome">
          <Stack.Screen name="THome" component={THome} options={{ title: 'Movies And Me...' }} />
          <Stack.Screen name="Search" component={Search} options={{ title: 'Rechercher un film' }} />
          <Stack.Screen name="DeteilsFilm" component={DeteilsFilm} options={{ title: 'Déteils du Film' }} /> 
          
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const Tab = createBottomTabNavigator();
function THome() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Principale}/>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorites" component={Favorites}/>
        <Tab.Screen name="Tdp" component={Tdp}/>
      </Tab.Navigator>
    );
  }