import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieCrashHead() {
  return (
    <LottieView
      style={{
        width: 140,
        height: 140,
        alignSelf: 'center',
        marginTop: 10
      }}
      autoPlay
      source={require('../../assets/lottie/crashHead.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}