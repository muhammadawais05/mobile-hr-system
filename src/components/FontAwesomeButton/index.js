import React from 'react'
import { TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const FontAwesomeButton = ({ icon, size, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon name={icon} size={size} style={style} />
    </TouchableOpacity>
  )
}

export default FontAwesomeButton
