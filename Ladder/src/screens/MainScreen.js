import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import supabase from '../supabase';
import useStore from '../store';
import AddMarket from './AddMarket';

export default function MainScreen({ navigation }) {
  const markets = useStore(state => state.markets);
  const setMarkets = useStore(state => state.setMarkets);
  const [isAddMarketModalVisible, setAddMarketModalVisible] = useState(false);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    const { data, error } = await supabase
      .from('Market')
      .select('*');
    
    if (data && !error) {
      setMarkets(data);
    }
  };

  const deleteMarket = async (marketId) => {
    const { error } = await supabase
      .from('Market')
      .delete()
      .eq('id', marketId);

    if (error) {
      alert(error.message);
    } else {
      setMarkets(markets.filter(market => market.id !== marketId));
    }
  };

  return (
    <View>
      <Text>Markets</Text>
      <FlatList
        data={markets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="View Products" onPress={() => navigation.navigate('Market', { marketId: item.id })} />
            <Button title="Delete" onPress={() => deleteMarket(item.id)} />
          </View>
        )}
      />
      <Button title="Add Market" onPress={() => setAddMarketModalVisible(true)} />
      <AddMarket visible={isAddMarketModalVisible} onClose={() => setAddMarketModalVisible(false)} />
    </View>
  );
}
