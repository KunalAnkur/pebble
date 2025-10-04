export type Screen = 'Dashboard' | 'ExpenseInput' | 'Profile' | 'Settings';

export type RootStackParamList = {
  Dashboard: undefined;
  ExpenseInput: undefined;
  Profile: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
