import { SvgXml } from 'react-native-svg';
import { assets } from '@mds/icons';

export function PlusIcon() {
  return <SvgXml xml={assets['plus-24']} accessible={false} />;
}
