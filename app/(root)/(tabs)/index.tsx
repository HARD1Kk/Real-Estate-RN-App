import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row justify-between items-center mt-5 ">
          <View className="flex flex-row">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start justify-center ml-3">
              <Text className="font-rubik  text-xs text-black-200">
                Good Morning
              </Text>
              <Text className="font-rubik-medium text-base text-black-300">
                Hardik
              </Text>
            </View>
          </View>

          <Image source={icons.bell} className="size-6" />
        </View>

        <Search />

        <View className="mt-4 flex flex-row justify-between  ">
          <Text className="flex font-rubik-bold text-xl text-black-300">
            Featured
          </Text>
          <TouchableOpacity>
            <Text className="font-rubik-bold text-xl text-blue-500">
              See All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
