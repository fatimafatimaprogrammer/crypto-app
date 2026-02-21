import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function TradeScreen({ route, balance, setBalance, portfolio, setPortfolio }) {
  const { coin } = route.params;
  const [quantity, setQuantity] = useState('');

  const handleTrade = (type) => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Invalid Quantity', 'Enter a valid amount to trade.');
      return;
    }

    const cost = qty * coin.price;
    if (type === 'Buy') {
      if (cost > balance) {
        Alert.alert('Insufficient Balance', 'Not enough funds to buy.');
        return;
      }
      setBalance(balance - cost);
      setPortfolio((p) => ({
        ...p,
        [coin.symbol]: (p[coin.symbol] || 0) + qty,
      }));
      Alert.alert('Trade Successful', `You bought ${qty} ${coin.symbol}`);
    } else {
      if (!portfolio[coin.symbol] || portfolio[coin.symbol] < qty) {
        Alert.alert('Not Enough Coins', `You don’t have enough ${coin.symbol} to sell.`);
        return;
      }
      setBalance(balance + cost);
      setPortfolio((p) => ({
        ...p,
        [coin.symbol]: p[coin.symbol] - qty,
      }));
      Alert.alert('Trade Successful', `You sold ${qty} ${coin.symbol}`);
    }
    setQuantity('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>
            {coin.name} ({coin.symbol})
          </Text>
          <Text style={styles.price}>${coin.price.toLocaleString()}</Text>
          <Text style={styles.balance}>Balance: ${balance.toFixed(2)}</Text>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={() => handleTrade('Buy')}
            >
              <Text style={styles.buttonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#D73853' }]}
              onPress={() => handleTrade('Sell')}
            >
              <Text style={styles.buttonText}>Sell</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.portfolio}>
            <Text style={styles.portfolioTitle}>Your Portfolio:</Text>
            {Object.keys(portfolio).length === 0 ? (
              <Text style={{ color: '#888' }}>No holdings yet</Text>
            ) : (
              Object.entries(portfolio).map(([sym, qty]) => (
                <Text key={sym}>
                  {sym}: {qty}
                </Text>
              ))
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  price: { fontSize: 20, textAlign: 'center', marginBottom: 8 },
  balance: { color: '#666', textAlign: 'center', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  portfolio: { alignItems: 'center' },
  portfolioTitle: { fontWeight: 'bold', marginBottom: 4 },
});
