import { StyleSheet } from 'react-native'

import { scaledWidth, scaledHeight } from '../../utils/responsive'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    // justifyContent: 'center', // Commented for future use.
    backgroundColor: '#e5e5e5',
  },
  containerTop: {
    padding: '5%',
    paddingTop: '10%',
    flexDirection: 'row',
    height: scaledHeight(170),
    backgroundColor: '#e5e5e5',
    justifyContent: 'space-between',
  },
  headerTextStyle: {
    color: '#a01f24',
    alignSelf: 'flex-start',
    fontSize: Platform.OS == 'ios' ? 20 : 15,
  },
  headerBodyTextStyle: {
    color: '#a01f24',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: Platform.OS == 'ios' ? 25 : 20,
  },
  image: {
    borderRadius: 100,
    width: scaledWidth(200),
    height: scaledHeight(200),
  },
  tagView: {
    bottom: 0,
    color: 'white',
    marginBottom: 4,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    height: scaledHeight(30),
  },
  // detailsBold: {
  //   fontSize: 18,
  //   color: 'black',
  // },
  // leaveDetails: {
  //   marginLeft: 5,
  //   fontSize: 18,
  //   color: '#a01f24',
  //   fontWeight: 'bold',
  // },
})

export default styles
