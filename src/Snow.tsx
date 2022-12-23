import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextStyle
} from 'react-native';
import { lightSnowflakes, mediumSnowflakes } from './snowflakeStrategies';
import Snowflake from './Snowflake';

const windowHeight = Dimensions.get('window').height + (Dimensions.get('window').height * .1);

const Snow: React.FC<{
  snowfall?: 'light' | 'medium';
  snowflakesStyle?: TextStyle
}> = ({snowfall = 'light', snowflakesStyle}) => {
  const snowflakes = snowfall === 'medium' ? mediumSnowflakes : lightSnowflakes;
  return (
    <View style={styles.view} pointerEvents="none">
    {
      snowflakes.map((snowflake, i) => {
        const { glyph, size, offset, fallDelay, shakeDelay } = snowflake;
        return (
          <Snowflake
            key={`snowflake-${i}`}
            glyph={glyph}
            size={size}
            offset={offset}
            fallDelay={fallDelay}
            shakeDelay={shakeDelay}
            style={snowflakesStyle}
          />
        );
      })
    }
  </View>
  );
}

export default Snow;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    zIndex: 9999,
    elevation: 9999,
    position: 'absolute',
    top: 0,
    left: -30,
    width: Dimensions.get('window').width + 30,
    height: windowHeight,
    backgroundColor: 'transparent'
  }
});
