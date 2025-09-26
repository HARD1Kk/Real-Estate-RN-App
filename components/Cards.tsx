import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

interface PropertyDocument extends Models.Document {
  image?: string;
  rating?: number;
  name?: string;
  address?: string;
  price?: number;
}

interface Props {
  item: PropertyDocument;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60  h-80 relative"
    >
      {item.image ? (
        <Image
          source={{ uri: item.image as string }}
          className="size-full rounded-2xl"
        />
      ) : null}
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row right-5 absolute bg-white/90 px-3 py-1.5 rounded-full top-5">
        <Image source={icons.star} className="size-3.5" />
         <Text className="text-xs font-rubik-bold text-primary-300">
           {item.rating != null ? item.rating.toString() : ""}
         </Text>
      </View>

      <View className="flex flex-col items-start inset-x-5 absolute bottom-5 ">
        <Text className=" text-xl font-rubik-extrabold text-white">
          {item.name ?? ""}
        </Text>
        <Text className="text-white font-rubik text-base ">
          {item.address ?? ""}
        </Text>
        <View className="flex flex-row justify-between  items-center w-full ">
          <Text
            className=" text-white text-xl font-rubik-extrabold "
            numberOfLines={1}
          >
            {item.price != null ? `$${item.price}` : ""}
          </Text>
          <Image source={icons.heart} className="size-5 " />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full  px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      {item.image ? (
        <Image
          source={{ uri: item.image as string }}
          className="size-full rounded-xl w-full h-40"
        />
      ) : null}

      <View className="flex flex-row right-5 absolute px-3 py-1.5 top-6 rounded-full bg-white/90">
        <Image source={icons.star} className="size-3.5 items-center " />
        <Text className="text-xs font-rubik-bold text-primary-300">
          {item.rating != null ? item.rating.toString() : ""}
        </Text>
      </View>

      <View className="flex flex-col items-start mt-2 rounded-lg ">
        <Text className="text-black-300 text-base mt-2 font-rubik-extrabold">
          {item.name ?? ""}
        </Text>
        <Text className="text-black-200 text-xs font-rubik">
          {item.address ?? ""}
        </Text>
        <View className="flex flex-row justify-between  items-center w-full">
          <Text className="text-base font-rubik-bold mt-2 text-primary-300">
            {item.price != null ? `$${item.price}` : ""}
          </Text>
          <Image
            source={icons.heart}
            className="size-5 w-5 h-5 me-2 "
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
