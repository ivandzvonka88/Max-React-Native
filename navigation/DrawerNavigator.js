import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Auth } from 'aws-amplify';
import WorkoutsScreen from '../screens/workouts/WorkoutsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import SignOutScreen from '../screens/SignOut'
import DrawerContent from './DrawerContent'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
      return null
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="Workouts"
      hideStatusBar={false}
      drawerPosition="right"
      drawerContent={DrawerContent}
    >
      <Drawer.Screen
        name="Workouts"
        component={WorkoutsNavigator}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
      />
      <Drawer.Screen
        name="Payment"
        component={PaymentNavigator}
      />
      <Drawer.Screen
        name="Logout"
      >
        {() => <SignOutScreen updateAuthState={updateAuthState} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const WorkoutsStack = createStackNavigator();

function WorkoutsNavigator() {
  return (
    <WorkoutsStack.Navigator screenOptions={{ headerShown: false }}>
      <WorkoutsStack.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={{ headerTitle: 'MaxPower' }}
      />
    </WorkoutsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
    </ProfileStack.Navigator>
  );
}

const PaymentStack = createStackNavigator();

function PaymentNavigator() {
  return (
    <PaymentStack.Navigator screenOptions={{ headerShown: false }}>
      <PaymentStack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerTitle: 'Payment' }}
      />
    </PaymentStack.Navigator>
  );
}
