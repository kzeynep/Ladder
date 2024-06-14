import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import supabase from '../supabase';
import useStore from '../store';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore(state => state.setUser);

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();
    
    if (data && !error) {
      setUser(data);
      navigation.navigate('Main');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View>
      <Text>Log in</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
}
