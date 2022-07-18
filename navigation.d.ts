import { RootStackParams } from './src/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
