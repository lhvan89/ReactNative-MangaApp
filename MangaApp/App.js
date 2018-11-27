import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailScreen';
import ChapterScreen from './components/ChapterScreen';
import LoginScreen from './components/LoginScreen';

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Chapter: {
      screen: ChapterScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
  
    global.screenWidth = Dimensions.get('window').width
    global.apiHost = 'https://api-dev.shoe-buddy.com'

    return <AppContainer />;
  }
}