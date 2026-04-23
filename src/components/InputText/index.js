import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { defaultStyle } from './style'

const InputText = ({ style, label, onPress, textStyle }) => {
  const {
    color,
    padding,
    fontSize,
    alignSelf,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
  } = style

  const combinedStyle = {
    ...Object.assign({}, defaultStyle, style),
    padding: padding || 0,
    color: color || 'black',
    fontSize: fontSize || 15,
    marginTop: marginTop || 0,
    marginLeft: marginLeft || 0,
    marginRight: marginRight || 0,
    marginBottom: marginBottom || 0,
    alignSelf: alignSelf || 'flex-start',
  }

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        disabled={!onPress}
      >
        <Text style={[combinedStyle, textStyle]}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InputText
