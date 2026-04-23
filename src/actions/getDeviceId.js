import Constants from 'expo-constants';
import * as Application from 'expo-application'

const getDeviceId = () => {
  if (Platform.OS === 'android') {
    return Application.androidId
  } else if (Platform.OS === 'ios') {
    return Constants.installationId
  }
}

export default getDeviceId
