import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Sign from '~/pages/Sign';

import CheckIn from '~/pages/CheckIn';
import HelpOrders from '~/pages/HelpOrders';

import NewOrder from '~/pages/HelpOrders/NewOrder';
import Answer from '~/pages/HelpOrders/Answer';

import HeaderTitle from '~/components/HeaderTitle';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign,
        App: createBottomTabNavigator(
          {
            CheckInStack: {
              screen: createStackNavigator(
                {
                  CheckIn,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTitle: <HeaderTitle />,
                    headerTitleStyle: {
                      textAlign: 'center',
                    },
                    headerTransparent: false,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              },
            },
            Orders: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  NewOrder,
                  Answer,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTitle: <HeaderTitle />,
                    headerTitleStyle: {
                      textAlign: 'center',
                    },
                    headerTransparent: false,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: 'rgba(238, 78, 98, 0.5)',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
