import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="h-4/6  w-full "
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base font-rubik uppercase text-center text-black-200 ">
            Welcome to ReState Networks
          </Text>
          <Text className=" font-rubik-bold text-center text-black-300 mt-2 text-3xl">
            Your <Text className="text-primary-300">Dream Home</Text> is
            {"\n"}Just a Tap Away
          </Text>

          <Text className="text-lg font-rubik text-center mt-12 text-black-200">
            Login to ReState Networks with Google
          </Text>
          <TouchableOpacity className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 ">
            <View className="flex flex-row items-center justify-center ">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium  text-center text-black-300 ml-2">
                {" "}
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
