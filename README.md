# react-native-snow-reanimated
Rework of [react-native-snow](https://github.com/ryanoboril/react-native-snow) package using reanimated and typescript

# Usage
To use, install the npm module:
```
npm install --save react-native-snow-reanimated
```

Make sure to have [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) installed as well

Then import the Snow component:
```ts
import Snow from 'react-native-snow-reanimated';
```

Then add it anywhere in your JSX (you should only do this in one place!):
```tsx
const App = () => {
  return (
    <View>
      ...
      <Snow />
      ...
    </View>
  )
}
```

<img src="https://s3.amazonaws.com/react-native-snow-screenshots/android.png" width="250" height="444" /> <img src="https://s3.amazonaws.com/react-native-snow-screenshots/ios.png" width="250" height="444" />

# Props
```js
// Specify color of snowflakes.
snowflakesStyle: { color: 'blue' }
// Specify amount of snowflakes present ('light', 'medium')
snowfall: 'medium'
```

# Thanks

Thanks to original author and package [react-native-snow](https://github.com/ryanoboril/react-native-snow)