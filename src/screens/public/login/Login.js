import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {initApiClient} from '../../../api/api_instance.js';
import {styles} from './Login.styles.js';

const Login = ({navigation}) => {
  const [form, setForm] = useState([
    {name: 'name', secure: false, value: '', key: '1'},
    {name: 'password', secure: true, value: '', key: '2'},
  ]);
  const onChangeText = (data, name) => {
    setForm(
      form.map(element =>
        element.name === name ? {...element, value: data} : element,
      ),
    );
  };
  const login = async () => {
    const fiboEndpoints = await initApiClient();
    const res = await fiboEndpoints.login.post({
      name: form[0].value,
      password: form[1].value,
    });
    if (res.status) navigation.navigate('RAM');
    console.log(res);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {form.map(({name, secure, value, key}) => (
        <TextInput
          style={styles.input}
          onChangeText={data => onChangeText(data, name)}
          value={value}
          name={name}
          secureTextEntry={secure}
          key={key}
        />
      ))}

      <TouchableOpacity style={styles.primaryButton} onPress={login}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.textSecondaryButton}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
