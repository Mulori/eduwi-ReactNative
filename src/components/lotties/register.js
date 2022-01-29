import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieRegister() {
  return (
    <LottieView
      style={{
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 10
      }}
      autoPlay
      source={require('../../assets/lottie/register.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}