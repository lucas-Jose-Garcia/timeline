/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-log.svg'
import { api } from '../src/lib/api'
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/e25fc11db9bf323dfd0d',
}

export default function App() {
  const router = useRouter()

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'e25fc11db9bf323dfd0d',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const registerResponse = await api.post('/register', {
      code,
    })

    const { token } = registerResponse.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   'response',
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )
    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="font-body text-center text-base leading-tight text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="font-body text-center text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
