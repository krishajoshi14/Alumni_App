import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Home from './Screens/Home'
import Post from './Screens/Post';
import { NavigationContainer } from '@react-navigation/native';
import Network from './Screens/Network';
import Profile from './Screens/Profile';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>

        <Tab.Screen
        name="Home"
        component={Home}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
            <AntDesign name="plussquare" size={24} color={"black"} />
          ),
        }}
      />
      <Tab.Screen
        name="Network"
        component={Network}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
