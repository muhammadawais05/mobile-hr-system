import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import InputText from '../InputText'
import { colors } from '../../utils/colors'
import { inputStyle } from '../InputText/style'
import { textStyle, containerStyle, defaultStyle } from './style'

const Input = ({
  style,
  value,
  withLabel,
  SearchIcon,
  placeholder,
  onChangeText,
  secureTextEntry,
}) => {
  const [hidePass, setHidePass] = useState(secureTextEntry)

  const { alignSelf, borderRadius, backgroundColor } = style

  const combinedStyle = {
    ...Object.assign({}, defaultStyle, style),
    borderRadius: borderRadius || 10,
    alignSelf: alignSelf || 'flex-start',
    backgroundColor: backgroundColor || 'white',
  }

  return (
    <View>
      {withLabel ? <InputText style={inputStyle} /> : undefined}
      <View style={combinedStyle}>
        <View style={containerStyle}>
          <TextInput
            value={value}
            style={textStyle}
            placeholder={placeholder}
            secureTextEntry={hidePass}
            onChangeText={onChangeText}
            selectionColor={colors.black}
            placeholderTextColor={SearchIcon ? colors.midPink : colors.gray}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => {
                setHidePass(!hidePass)
              }}
            >
              <FontAwesome5 size={15} name={hidePass ? 'eye-slash' : 'eye'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default Input
