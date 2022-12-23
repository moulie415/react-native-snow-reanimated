import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextStyle
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import useAppState from './UseAppState';

const HEIGHT = Dimensions.get('window').height;
const topOffset = HEIGHT * .1;
const windowHeight = HEIGHT + topOffset;

const Snowflake: React.FC<{
  glyph: string;
  size: number;
  offset: string;
  amplitude?: number;
  fallDuration?: number;
  shakeDuration?: number;
  fallDelay:  number;
  shakeDelay: number;
  style?: TextStyle;
}> = (props) => {

  const size = props.size || 12;
  const amplitude = props.amplitude || 60;
  const fallDuration = props.fallDuration || 10000;
  const shakeDuration = props.shakeDuration || 4000
  const fallDelay = props.fallDelay || 0
  const shakeDelay = props.shakeDelay || 0
  const offset = props.offset || 0

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0);

  useEffect(() => {
    console.log('test 1')
    _initAnimation()
  }, [])

  useAppState(
    () => {
     //  _initAnimation();
    },
    () => {
      _stopAnimation()
    }
  )

  const _stopAnimation = useCallback(() => {
    translateY.value = 0;
    translateX.value = 0;
  }, [])

  const _initAnimation = useCallback(() => {
    translateY.value = withDelay(
      fallDelay,
      withRepeat(
        withTiming(
          1, {
            easing: Easing.linear,
            duration: fallDuration
          }
        ),
      -1
      )
    )

    translateX.value = withDelay(
      shakeDelay,
      withRepeat(
        withSequence(
          withTiming(
            1,
            {
              easing: Easing.inOut(Easing.sin),
              duration: shakeDuration / 2,
            }
          ),
          withTiming(
            0,
            {
              easing: Easing.inOut(Easing.sin),
              duration: shakeDuration / 2
            }
          )
        ),
        -1
      )
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
        fontSize: size,
        left: offset,
        transform: [
          {
            translateX: interpolate(
              translateX.value,
              [0, 1],
              [0, amplitude]
            )
          }, 
          {
            translateY: interpolate(
              translateY.value,
              [0, 1],
              [0, windowHeight]
            )

          }
      ]
      }
  })

    return (
      <Animated.Text style={[styles.text, animatedStyle, props.style]}>
        {props.glyph || '❅'}
      </Animated.Text>
    );
}

export default Snowflake


const styles = StyleSheet.create({
  text: {
    top: -topOffset,
    height: windowHeight,
    color: 'white',
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  }
});
