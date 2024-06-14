import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import supabase from '../supabase';
import useStore from '../store';

export default function AddMarket({ visible, onClose }) {
  const [marketName, setMarketName] = useState('');
  const markets = useStore(state => state.markets);
  const setMarkets = useStore(state => state.setMarkets);

  const addMarket = async () => {
    if (!marketName) {
      alert('Market name cannot be empty');
      return;
    }

    const { data, error } = await supabase
      .from('Market')
      .insert([{ name: marketName }]);

    if (error) {
      alert(error.message);
    } else {
      setMarkets([...markets, ...data]);
      onClose();
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View>
        <Text>Add Market</Text>
        <TextInput
          placeholder="Market Name"
          value={marketName}
          onChangeText={setMarketName}
        />
        <Button title="Add" onPress={addMarket} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
}
