import {Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Redirect } from "expo-router";
import {images} from "../constants"
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";


export default function App () {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className="w-full justify-center items-center
                h-[85vh] px-4">
                    <Image
                    source={images.logo}
                    className="w-[130px] h-[84px]"
                    resizeMode="contain"
                    />

                    <Image
                    source={images.cards}
                    className="max-w-[380px] w-full h-[300px]"
                    resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-4xl text-white font-bold text-center">
                            Discover Endless Possibilities with {" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>

                        <Image
                        source={images.path}
                        className="w-[136px] h-[15px] absolute -bottom-1 -right-4"
                        resizeMode="contain"
                        />
                    </View>

                    <Text  className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meets innovation: embark on a
                        journey of limitless exploration with Aora
                    </Text>

                    <CustomButton
                    title="Continue with Email"
                    handlePress={() => router.push("/sign-in")}
                    containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622"
            style="light" />
        </SafeAreaView>
    )
}

