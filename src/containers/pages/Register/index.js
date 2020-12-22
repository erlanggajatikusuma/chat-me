import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'

const Register = () => {
    return (
        <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
            <ScrollView>
                <Text>Let's create your account!</Text>
                <View style={{paddingTop: 30}}>
                    <Text style={{color: '#848484'}}>Name</Text>
                    <TextInput placeholder="Name" style={{borderRadius: 3,borderBottomWidth: 1, borderBottomColor: '#232323'}} />
                </View>
                <View style={{paddingTop: 30}}>
                    <Text style={{color: '#848484'}}>Email</Text>
                    <TextInput placeholder="Email" style={{borderRadius: 3,borderBottomWidth: 1, borderBottomColor: '#232323'}} />
                </View>
                <View style={{paddingTop: 30, paddingBottom: 30}}>
                    <Text style={{color: '#848484'}}>Password</Text>
                    <TextInput placeholder="Password" style={{borderRadius: 3,borderBottomWidth: 1, borderBottomColor: '#232323'}} />
                </View>
                <TouchableOpacity style={{backgroundColor: '#7E98DF', paddingHorizontal: 12,paddingVertical: 15, borderRadius: 70}}>
                    <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#FFF'}}>REGISTER</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})
