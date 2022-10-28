import React from 'react';
import {Platform, Text, View} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {styles} from './Permission.styles.js';

export const Permission = () => {
  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus === 'denied') {
        const permissionStatus = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
      } else {
        console.log('tengo permiso');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text>Permission</Text>
    </View>
  );
};
