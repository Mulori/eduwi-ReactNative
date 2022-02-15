import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieFinishBlue() {
  return (
    <LottieView
      style={{
        width: 180,
        height: 180,
        alignSelf: 'center',
        marginTop: 10
      }}
      autoPlay
      source={require('../../assets/lottie/finishBlue.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}