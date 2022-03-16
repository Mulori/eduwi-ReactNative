import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieConfig() {
  return (
    <LottieView
      style={{
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginLeft: 10,
        bottom: 3
      }}
      autoPlay
      source={require('../../assets/lottie/config.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}