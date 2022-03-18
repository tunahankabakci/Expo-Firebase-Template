import { View, Text, Image } from 'react-native'
import React from 'react'

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 250, height: 45 }}
      source={require('../assets/logo.png')}
    />
  )
}

export default LogoTitle