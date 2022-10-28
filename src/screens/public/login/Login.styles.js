import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {justifyContent: 'center', flex: 1},
  input: {borderWidth: 1, margin: 10},
  primaryButton: {backgroundColor: 'blue', margin: 10, padding: 15},
  textButton: {fontWeight: '700', color: '#fff', textAlign: 'center'},
  secondaryButton: {margin: 10, padding: 15, marginVertical: 0},
  textSecondaryButton: {
    fontWeight: '700',
    textAlign: 'center',
    color: 'blue',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    padding: 30,
  },
});
