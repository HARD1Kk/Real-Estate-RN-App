import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({ fn: getLatestProperties });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: { query: params.query!, filter: params.filter!, limit: 6 },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 py-2"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#0061FF"
              className="text-primary-300 mt-5"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between items-center mt-5 ">
              <View className="flex flex-row">
                <Image
                  source={{
                    uri:
                      user?.avatar ||
                      `https://cloud.appwrite.io/v1/avatars/initials?name=${user?.name}`,
                  }}
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

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerClassName="flex gap-5 mt-5 "
                />
              )}
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
