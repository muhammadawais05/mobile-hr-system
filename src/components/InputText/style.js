import { colors } from '../../utils/colors'

const defaultStyle = {}

const loginFieldStyle = {
  fontSize: 18,
  marginTop: '5%',
  marginLeft: '15%',
  marginBottom: '5%',
}

const loginErrorStyle = {
  fontSize: 12,
  marginTop: 20,
  color: '#fff',
  marginLeft: 20,
  alignSelf: 'flex-start',
}

const mainScreenStyle = {
  marginTop: 20,
  marginLeft: 20,
  color: '#a01f24',
  fontWeight: 'bold',
  alignSelf: 'flex-start',
  fontSize: Platform.OS == 'ios' ? 25 : 20,
}

const loginContainerStyle = {
  fontSize: 24,
  fontWeight: '500',
  alignSelf: 'center',
  color: colors.TextColor,
}

const inputStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  color: colors.lightOrange,
}

export {
  inputStyle,
  defaultStyle,
  mainScreenStyle,
  loginFieldStyle,
  loginErrorStyle,
  loginContainerStyle,
}
