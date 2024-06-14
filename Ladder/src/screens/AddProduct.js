import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import supabase from '../supabase';
import useStore from '../store';

export default function AddProduct({ visible, onClose, marketId }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const products = useStore(state => state.products);
  const setProducts = useStore(state => state.setProducts);

  const addProduct = async () => {
    if (!productName || !quantity) {
      alert('Product name and quantity cannot be empty');
      return;
    }

    const { data, error } = await supabase
      .from('Product')
      .insert([{ name: productName, quantity: parseInt(quantity), marketId }]);

    if (error) {
      alert(error.message);
    } else {
      setProducts([...products, ...data]);
      onClose();
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View>
        <Text>Add Product</Text>
        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <Button title="Add" onPress={addProduct} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
}
