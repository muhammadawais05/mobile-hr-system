import { colors } from '../../utils/colors'
import { scaledHeight, scaledWidth } from '../../utils/responsive'

const defaultStyle = {
  elevation: 4,
  shadowRadius: 2.62,
  shadowOpacity: 0.23,
  shadowColor: '#000',
  textAlign: 'center',
  alignSelf: 'center',
  color: colors.white,
  backgroundColor: '#a01f24',
  shadowOffset: { width: scaledWidth(0), height: scaledHeight(2) },
}

const containerStyle = {
  alignSelf: 'center',
  alignItems: 'center',
  flexDirection: 'row',
}

const textStyle = { fontSize: 20, color: 'white', fontWeight: 'bold' }

const loginButtonStyle = {
  padding: 3,
  fontSize: 25,
  marginTop: '10%',
  borderRadius: 20,
  fontWeight: 'bold',
  justifyContent: 'center',
  height: scaledHeight(50),
  width: Platform.OS == 'ios' ? scaledWidth(280) : scaledWidth(310),
}

const applyLeaveButtonStyle = {
  padding: 3,
  fontSize: 25,
  marginTop: '10%',
  borderRadius: 20,
  fontWeight: 'bold',
  justifyContent: 'center',
  height: scaledHeight(50),
  width: Platform.OS == 'ios' ? scaledWidth(180) : scaledWidth(310),
}

const backButtonStyle = {
  marginTop: '30%',
  color: '#a01f24',
  borderRadius: 20,
  marginLeft: '10%',
  fontWeight: 'bold',
  justifyContent: 'center',
  height: scaledHeight(50),
  width: Platform.OS == 'ios' ? scaledWidth(180) : scaledWidth(310),
}

const MainScreenButtonStyle = {
  padding: 10,
  fontSize: 22,
  marginTop: 30,
  borderRadius: 25,
  width: scaledWidth(300),
}

export {
  textStyle,
  defaultStyle,
  containerStyle,
  backButtonStyle,
  loginButtonStyle,
  MainScreenButtonStyle,
  applyLeaveButtonStyle,
}
