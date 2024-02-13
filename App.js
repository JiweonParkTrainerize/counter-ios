import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NativeModules, NativeEventEmitter } from 'react-native'

const CounterEvents = new NativeEventEmitter(NativeModules.Counter)
// subscribe to event
CounterEvents.addListener(
  "onIncrement",
  res => console.log("onIncrement event", res)
)
console.log(NativeModules.Counter);
NativeModules.Counter.increment()
NativeModules.Counter.getCount(value => {
  console.log("count is " + value)
});


async function decrement() {
  try {
    const res = await NativeModules.Counter.decrement()
    console.log(res)
  } catch(e) {
    console.log(e.message, e.code)
  }
}

decrement()
decrement()

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
