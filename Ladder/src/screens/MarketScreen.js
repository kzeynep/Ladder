import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import supabase from '../supabase';
import useStore from '../store';
import AddProduct from './AddProduct';

export default function MarketScreen({ route }) {
  const { marketId } = route.params;
  const products = useStore(state => state.products);
  const setProducts = useStore(state => state.setProducts);
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('marketId', marketId);
    
    if (data && !error) {
      setProducts(data);
    }
  };

  const deleteProduct = async (productId) => {
    const { error } = await supabase
      .from('Product')
      .delete()
      .eq('id', productId);

    if (error) {
      alert(error.message);
    } else {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const updateProductQuantity = async (productId, quantity) => {
    const { error } = await supabase
      .from('Product')
      .update({ quantity })
      .eq('id', productId);

    if (error) {
      alert(error.message);
    } else {
      fetchProducts();
    }
  };

  return (
    <View>
      <Text>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.quantity}</Text>
            <Button title="Delete" onPress={() => deleteProduct(item.id)} />
            <Button title="Update Quantity" onPress={() => updateProductQuantity(item.id, item.quantity + 1)} />
          </View>
        )}
      />
      <Button title="Add Product" onPress={() => setAddProductModalVisible(true)} />
      <AddProduct visible={isAddProductModalVisible} onClose={() => setAddProductModalVisible(false)} marketId={marketId} />
    </View>
  );
}
