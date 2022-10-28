import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './Signin.styles';
import DatePicker from 'react-native-date-picker';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {initApiClient} from '../../../api/api_instance';
const Signin = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState([
    {name: 'name', secure: false, value: '', key: '1', type: 'text'},
    {name: 'lastName', secure: false, value: '', key: '2', type: 'text'},
    {
      name: 'time',
      secure: false,
      value: new Date(),
      key: '3',
      type: 'button',
      action: () => setOpen(true),
    },
    {
      name: 'location',
      secure: false,
      value: null,
      key: '4',
      type: 'button',
      action: getLocation,
    },
    {
      name: 'picture',
      secure: false,
      value: null,
      key: '5',
      type: 'img',
      action: () => launchCamreaAndroid(),
    },
  ]);
  useEffect(() => {
    console.log(form);
  }, [form]);

  const [open, setOpen] = useState(false);
  const onChangeText = (data, name) => {
    setForm(
      form.map(element =>
        element.name === name ? {...element, value: data} : element,
      ),
    );
  };
  const getLocation = async () => {
    console.log('permiso');

    const permissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (permissionStatus === 'denied') {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    } else {
      console.log('tengo permiso');

      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          // console.log(location);
          onChangeText(location, 'location');
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
    console.log(permissionStatus);
  };

  const launchCamreaAndroid = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.6,
      includeBase64: true,
    };
    launchCamera(options, resp => {
      //onsole.log(resp.assets[0]);
      if (resp.didCancel) return;
      if (!resp.assets[0].base64) return;
      if (!resp.assets[0].uri) return;
      onChangeText(
        {b64: resp.assets[0].base64, uri: resp.assets[0].uri},
        'picture',
      );
      //setPicture({b64: resp.assets[0].base64, uri: resp.assets[0].uri});
    });
  };

  const signin = async () => {
    const fiboEndpoints = await initApiClient();
    const res = await fiboEndpoints.user.post(form);
    if (res.status) navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signin</Text>
      {form.map(({name, secure, value, key, type, action = () => {}}) => {
        switch (type) {
          case 'text':
            return (
              <TextInput
                style={styles.input}
                onChangeText={data => onChangeText(data, name)}
                value={value}
                name={name}
                secureTextEntry={secure}
                key={key}
                placeholder={name}
              />
            );
          case 'button':
            return (
              <TouchableOpacity
                key={key}
                style={styles.secondaryButton}
                onPress={name === 'location' ? getLocation : action}>
                <Text style={styles.textSecondaryButton}>
                  {name === 'location' && value === null
                    ? 'Selecciona ubicacion'
                    : name === 'location'
                    ? `lat:${value?.latitude}, longitude: ${value?.longitude}`
                    : value.toString()}
                </Text>
              </TouchableOpacity>
            );
          case 'img':
            return (
              <View style={styles.containerImg} key={key}>
                {!value ? (
                  <TouchableOpacity
                    onPress={name === 'picture' ? launchCamreaAndroid : action}
                    style={styles.buttonImg}
                  />
                ) : (
                  <Image source={{uri: value.uri}} style={styles.buttonImg} />
                )}
              </View>
            );
        }
      })}

      <TouchableOpacity style={styles.primaryButton} onPress={signin}>
        <Text style={styles.textButton}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textSecondaryButton}>Volver</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          //setDate(date);
          onChangeText(date, 'time');
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default Signin;
