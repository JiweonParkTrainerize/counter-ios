import { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeModules, NativeEventEmitter, TouchableOpacity, requireNativeComponent, UIManager,
  findNodeHandle } from 'react-native'

const CounterView = requireNativeComponent("CounterView")

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
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  const onUpdate = (e) => {
    setCount(e.nativeEvent.count)
  }

  const updateNative = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(counterRef.current),                     // 1
      UIManager["CounterView"].Commands.updateFromManager, // 2
      [count]                                              // 3
    );
  }

  const increment = () => {
    setCount(prev => prev + 1);
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={[styles.wrapper, styles.border]}
          onPress={increment}
          onLongPress={updateNative}
        >
          <Text style={styles.button}>
            {count}
          </Text>
        </TouchableOpacity>
        <CounterView style={styles.wrapper} count={2} onUpdate={onUpdate} ref={counterRef}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "stretch"
  },
  wrapper: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  border: {
    borderColor: "#eee", borderBottomWidth: 1
  },
  button: {
    fontSize: 50, color: "orange"
  }
});