import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function WindMill() {
  return (
    <LottieView
      style={{
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 10
      }}
      autoPlay
      source={require('../../assets/lottie/WindMill.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}