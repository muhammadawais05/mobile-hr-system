import { View } from 'react-native'
import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

const InitialStack = ({ navigation }) => {
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const response = await SecureStore.getItemAsync('isAuth')
    if (response) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainScreen' }],
      })
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthStack',
            state: {
              routes: [{ name: 'Login' }],
            },
          },
        ],
      })
    }
  }
  return <View />
}

export default InitialStack
