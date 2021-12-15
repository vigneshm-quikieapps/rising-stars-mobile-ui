import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (setType, data, object = false) => {
  try {
    if (object === true) {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`${setType}`, jsonValue);
    } else {
      await AsyncStorage.setItem(`${setType}`, data);
    }
  } catch (error) {
    throw error;
  }
};

export const getLocalData = async (getType, object = false) => {
  try {
    const getdata = await AsyncStorage.getItem(`${getType}`);
    if (getdata !== null) {
      console.log(getdata);
      if (object === true) {
        return JSON.parse(getdata);
      } else {
        return getdata;
      }
    } else {
      console.log(`No ${getType} found`);
    }
  } catch (error) {
    throw error;
  }
};

export const addLocalData = async (addType, data) => {
  try {
    await AsyncStorage.mergeItem(`${addType}`, data);
  } catch (error) {
    throw error;
  }
};

export const removeLocalData = async removeType => {
  console.log('removeType :', removeType);

  try {
    console.log('removeType----------> :', removeType);
    await AsyncStorage.removeItem(`${removeType}`);
  } catch (error) {
    throw error;
  }
};

export const multisetLocalData = async (...store) => {
  try {
    await AsyncStorage.multiSet([...store]);
  } catch (error) {
    throw error;
  }
};
