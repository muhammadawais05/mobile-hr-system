import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { containerStyle, lineStyle, textStyle } from './style'

const HorizontalLineWithText = ({ text }) => {
  return (
    <View style={containerStyle}>
      <View style={lineStyle} />
      <Text style={textStyle}>{text}</Text>
      <View style={lineStyle} />
    </View>
  )
}

export default HorizontalLineWithText
