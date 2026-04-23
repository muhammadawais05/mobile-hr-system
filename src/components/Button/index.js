import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

import { textStyle, containerStyle, defaultStyle } from './style'

const Button = ({ title, style, onPress, loading, isCheckedIn }) => {
  const combinedStyle = Object.assign({}, defaultStyle, style)

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={combinedStyle}
      disabled={!onPress || isCheckedIn}
    >
      <View style={containerStyle}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={textStyle}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
