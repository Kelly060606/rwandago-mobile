declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { TextStyle } from 'react-native';

  type IconProps = {
    name: string;
    color?: string;
    size?: number;
    style?: TextStyle;
  };

  export default class MaterialCommunityIcons extends Component<IconProps> {
    static loadFont: () => Promise<void>;
  }
}