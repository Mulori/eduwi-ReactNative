import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieMonster() {
  return (
    <LottieView
      style={{
        width: '50%',
        alignSelf: 'center',
        backgroundColor: '#486d6e',
      }}
      autoPlay
      source={require('../../assets/lottie/monster.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}