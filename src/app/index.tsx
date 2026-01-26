import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const isAuthenticated = false;
export default function Index() {

    const {status, checkStatus} = useAuthStore();

    useEffect(() => {
        console.log('Checando status');
        checkStatus();
    }, []);


    //TODO : Implementar splash screen
    if(status === 'checking'){
        return (
            <View className='flex justify-center items-center mb-5'>
                <ActivityIndicator/>
            </View>
        )
    }


    if(status === 'unauthenticated'){
        return <Redirect href={'/Login'} />
    }

    
    
    return <Redirect href={'/mainMenu'}/>

}