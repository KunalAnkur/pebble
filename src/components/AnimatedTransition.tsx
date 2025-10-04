import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  isVisible,
  onAnimationComplete,
}) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      // Show the component and slide up
      setShouldRender(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down animation, then hide the component
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
        onAnimationComplete?.();
      });
    }
  }, [isVisible, translateY, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: [{ translateY }],
        zIndex: 1000,
      }}
    >
      {children}
    </Animated.View>
  );
};
