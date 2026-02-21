import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import CryptoListItem from '../components/CryptoListItem';
import { initialCoins } from '../data/sampleData';

export default function MarketsScreen({ navigation }) {
  const [coins] = useState(initialCoins);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CryptoListItem
            coin={item}
            onPress={(coin) => navigation.navigate('Trade', { coin })}
          />
        )}
      />
    </View>
  );
}
