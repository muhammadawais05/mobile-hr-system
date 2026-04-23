import { Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

const scaledWidth = (number) => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number)
  let multiPly = givenWidth * 0.23
  return PixelRatio.roundToNearestPixel((width * multiPly) / 100)
}

const scaledHeight = (number) => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number)
  let multiPly = givenHeight * 0.108
  return PixelRatio.roundToNearestPixel((height * multiPly) / 100)
}

export { scaledWidth, scaledHeight }
