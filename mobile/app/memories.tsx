import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Memories() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white">Memories</Text>
      <Link
        href="/new"
        className="w-25 mt-2 h-10 bg-purple-400 text-lg text-gray-50"
      >
        Adicionar
      </Link>
    </View>
  )
}
