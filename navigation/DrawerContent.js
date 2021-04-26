import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { Linking } from 'react-native';
import * as React from 'react';

export default function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
                label="Workouts"
                onPress={() => props.navigation.navigate('Workouts')}
            />
            <DrawerItem
                label="Profile"
                onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
                label="Payment"
                onPress={() => props.navigation.navigate('Payment')}
            />
            <DrawerItem
                label="Logout"
                onPress={() => props.navigation.navigate('Logout')}
            />
        </DrawerContentScrollView>
    );
}