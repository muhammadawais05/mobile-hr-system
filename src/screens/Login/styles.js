import { StyleSheet, Platform } from 'react-native'

import { scaledHeight } from '../../utils/responsive'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e5e5e5',
  },
  containerTop: {
    flexDirection: 'row',
    height: scaledHeight(350),
    backgroundColor: '#e5e5e5',
    justifyContent: 'space-between',
  },
  mainLogo: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
  inputContainer: {
    opacity: 1,
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? '90%' : '100%',
  },
  biometricIconStyle: {
    marginLeft: '45%',
    marginRight: '45%',
  }
})

export default styles
