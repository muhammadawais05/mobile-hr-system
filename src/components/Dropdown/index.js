import React from 'react'
import { View } from 'react-native'

import { containerStyle, defaultStyle } from './style'
import DropDownPicker from 'react-native-dropdown-picker'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const Dropdown = ({
  open,
  value,
  style,
  items,
  setOpen,
  setValue,
  placeholder,
}) => {
  const { alignSelf, borderRadius, backgroundColor } = style

  const combinedStyle = {
    ...Object.assign({}, defaultStyle, style),
    borderRadius: borderRadius || 10,
    alignSelf: alignSelf || 'flex-start',
    backgroundColor: backgroundColor || 'white',
  }

  return (
    <View>
      <View>
        <View style={containerStyle}>
          <DropDownPicker
            ArrowDownIconComponent={() => {
              return (
                <FontAwesomeIcon
                  size={18}
                  color={'#a01f24'}
                  name="chevron-up"
                  style={{ paddingHorizontal: 5 }}
                />
              )
            }}
            ArrowUpIconComponent={() => {
              return (
                <FontAwesomeIcon
                  size={18}
                  color={'#a01f24'}
                  name="chevron-down"
                  style={{ paddingHorizontal: 5 }}
                />
              )
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            style={combinedStyle}
            dropDownDirection="TOP"
            placeholder={placeholder}
            disableBorderRadius={false}
          />
        </View>
      </View>
    </View>
  )
}

export default Dropdown
