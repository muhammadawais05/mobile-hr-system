import React from 'react'
import { View, Image, ScrollView } from 'react-native'

import styles from './styles'
import Calen from '../../../assets/calen.png'
import InputText from '../../components/InputText'
import { loginContainerStyle } from '../../components/InputText/style'

const LoginContainer = ({ children }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, marginBottom: 100 }}
    >
      <View style={styles.mainLogo}>
        <Image source={Calen} style={styles.logo} />
      </View>
      <InputText style={loginContainerStyle} />
      {children}
    </ScrollView>
  )
}

export default LoginContainer
