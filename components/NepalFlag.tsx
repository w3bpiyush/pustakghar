import React from 'react';
import { Image } from 'react-native';

interface NepalFlagProps {
  width?: number;
  height?: number;
  style?: any;
}

const NepalFlag: React.FC<NepalFlagProps> = ({ width = 24, height = 16, style }) => {
  return (
    <Image
      source={{ uri: 'https://flagcdn.com/w320/np.png' }}
      style={[{ width, height, resizeMode: 'contain', borderRadius: 2 }, style]}
    />
  );
};

export default NepalFlag; 