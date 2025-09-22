import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();

  const params = useLocalSearchParams<{ query?: string }>();
  console.log(params);
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (

      <View className="flex flex-row items-center justify-between px-4 w-full bg-accent-100 border rounded-lg border-primary-100 mt-5 py-2 ">
        <View className="flex flex-1 flex-row items-center justify-start z-50">
          <Image source={icons.search} className="size-5" />
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search for Anything"
            className="text-sm font-rubik ml-2 text-black-300 flex-1"
          />
        </View>

        <TouchableOpacity>
          <Image source={icons.filter} className="size-5" />
        </TouchableOpacity>
      </View>
  
  );
};

export default Search;
