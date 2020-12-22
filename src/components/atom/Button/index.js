import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Button = ({title, ...rest}) => {
    return (
        <TouchableOpacity {...rest}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})
