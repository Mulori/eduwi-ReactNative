import React from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';


export default function LottieQuestion() {
  return (
    <LottieView
      style={{
        width: '50%',
        alignSelf: 'center',
      }}
      autoPlay
      source={require('../../assets/lottie/question.json')}
      loop
      autoSize
      resizeMode="cover"
    />
  );
}