import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};
