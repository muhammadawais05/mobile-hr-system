import { scaledHeight, scaledWidth } from '../../utils/responsive'

const defaultStyle = {
  elevation: 6,
  shadowRadius: 2.62,
  shadowOpacity: 0.23,
  shadowColor: '#000',
  shadowOffset: { width: scaledWidth(0), height: scaledHeight(8) },
}

const containerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

const textStyle = {
  fontSize: 14,
  width: '80%',
  color: 'black',
  height: scaledHeight(50),
}

const dropdownStyle = {
  margin: '3%',
  width: '70%',
  borderRadius: 20,
  alignSelf: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: scaledHeight(50),
  borderColor: 'transparent',
  backgroundColor: '#e5e5e5',
}

const inputStyle = {
  width: '70%',
  borderRadius: 20,
  alignSelf: 'center',
  height: scaledHeight(50),
  backgroundColor: '#e5e5e5',
}

export { textStyle, defaultStyle, dropdownStyle, containerStyle, inputStyle }
