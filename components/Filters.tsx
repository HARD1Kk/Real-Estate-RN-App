import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCatogory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCatogory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategory(item.category)}
          className={`flex flex-col items-start mr-4 px-4  py-2 rounded-full ${selectedCatogory === item.category ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}
        >
          <Text
            className={`text-sm ${selectedCatogory === item.category ? "text-white font-rubik-bold mt-0.5 " : "text-black-300 font-rubik"}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
