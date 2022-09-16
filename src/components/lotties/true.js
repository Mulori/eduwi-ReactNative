import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieTrue() {
  return (
    <LottieView
      style={{
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 0
      }}
      autoPlay
      source={require('../../assets/lottie/true.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}