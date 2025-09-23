import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60  h-80 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row right-5 absolute bg-white/90 px-3 py-1.5 rounded-full top-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300">4.5</Text>
      </View>

      <View className="flex flex-col items-start inset-x-5 absolute bottom-5 ">
        <Text className=" text-xl font-rubik-extrabold text-white">
          Marilla Villa
        </Text>
        <Text className="text-white font-rubik text-base ">New York, US</Text>
        <View className="flex flex-row justify-between  items-center w-full ">
          <Text
            className=" text-white text-xl font-rubik-extrabold "
            numberOfLines={1}
          >
            $12219
          </Text>
          <Image source={icons.heart} className="size-5 " />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full  px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <Image
        source={images.newYork}
        className="size-full rounded-xl w-full h-40"
      />

      <View className="flex flex-row right-5 absolute px-3 py-1.5 top-6 rounded-full bg-white/90">
        <Image source={icons.star} className="size-3.5 items-center " />
        <Text className="text-xs font-rubik-bold text-primary-300">4.5</Text>
      </View>

      <View className="flex flex-col items-start mt-2 rounded-lg ">
        <Text className="text-black-300 text-base mt-2 font-rubik-extrabold">
          La Grand Maison
        </Text>
        <Text className="text-black-200 text-xs font-rubik">Tokyo, Japan</Text>
        <View className="flex flex-row justify-between  items-center w-full">
          <Text className="text-base font-rubik-bold mt-2 text-primary-300">
            $172167
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
