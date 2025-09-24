import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {user }= useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between items-center mt-5 ">
              <View className="flex flex-row">
                <Image
                  source={{uri:user?.avatar||`https://cloud.appwrite.io/v1/avatars/initials?name=${user?.name}`}}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start justify-center ml-3">
                  <Text className="font-rubik  text-xs text-black-200">
                    Good Morning
                  </Text>
                  <Text className="font-rubik-medium text-base text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className=" flex flex-row items-center justify-between ">
                <Text className="flex font-rubik-bold text-xl text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-xl text-blue-500">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1, 2, 3]}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                horizontal showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerClassName="flex gap-5 mt-5 "
              />
            </View>

            <View className="mt-4 flex flex-row justify-between  ">
              <Text className="flex font-rubik-bold text-xl text-black-300">
                Our Recomendation
              </Text>
              <TouchableOpacity>
                <Text className="font-rubik-bold text-xl text-blue-500">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
