import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieCrashHeadActivity() {
  return (
    <LottieView
      style={{
        width: 140,
        height: 140,
        alignSelf: 'center',
      }}
      autoPlay
      source={require('../../assets/lottie/crashHeadActivity.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}