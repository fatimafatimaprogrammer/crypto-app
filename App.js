import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketsScreen from './screens/MarketsScreen';
import TradeScreen from './screens/TradeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [balance, setBalance] = useState(50000); // starting balance
  const [portfolio, setPortfolio] = useState({}); // { BTC: qty }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Markets">
          {(props) => (
            <MarketsScreen
              {...props}
              balance={balance}
              portfolio={portfolio}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Trade">
          {(props) => (
            <TradeScreen
              {...props}
              balance={balance}
              setBalance={setBalance}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
