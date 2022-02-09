import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieWrite() {
  return (
    <LottieView
      style={{
        width: '50%',
        alignSelf: 'center',
      }}
      autoPlay
      source={require('../../assets/lottie/write.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}