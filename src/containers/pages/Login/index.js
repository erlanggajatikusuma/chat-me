import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'

const Login = () => {
    return (
        <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
            <ScrollView>
                <Text>Hi, Welcome back!</Text>
                <View style={{paddingTop: 30}}>
                    <Text style={{color: '#848484'}}>Email</Text>
                    <TextInput placeholder="Email" style={{borderRadius: 3,borderBottomWidth: 1, borderBottomColor: '#232323'}} />
                </View>
                <View style={{paddingTop: 30, paddingBottom: 30}}>
                    <Text style={{color: '#848484'}}>Password</Text>
                    <TextInput placeholder="Password" style={{borderRadius: 3,borderBottomWidth: 1, borderBottomColor: '#232323'}} />
                </View>
                <View style={{paddingBottom: 20, alignItems: 'flex-end'}}>
                    <Text style={{color: '#7E98DF', fontSize: 16}}>Forgot Password?</Text>
                </View>
                <TouchableOpacity style={{backgroundColor: '#7E98DF', paddingHorizontal: 12,paddingVertical: 15, borderRadius: 70}}>
                    <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#FFF'}}>LOGIN</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 35}}>
                    <Text style={{color: '#313131', paddingRight: 5, fontSize: 14}}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={{color: '#7E98DF', fontSize: 14}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})
