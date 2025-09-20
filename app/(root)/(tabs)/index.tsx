import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="bold text-3xl text-center my-10 font-rubik">Welcome to the Real Estate App</Text>
      

    </View>
  );
}
