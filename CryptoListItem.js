import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function CryptoListItem({ coin, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(coin)}>
      <View>
        <Text style={styles.name}>{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol}</Text>
      </View>
      <Text style={styles.price}>${coin.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  symbol: { color: '#666' },
  price: { fontWeight: '600' },
});
