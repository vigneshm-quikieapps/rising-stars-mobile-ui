import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeLocalData = async (setType, data) => {

    try {
        await AsyncStorage.setItem(`${setType}`, data)
    }
    catch (error) {
        throw error
    }
}

export const getLocalData = async (getType) => {
    console.log('refreshToken :',getType)
    try {
        const getdata = await AsyncStorage.getItem(`${getType}`)
        if (getdata !== null) {
        console.log('getdata :', getdata);
          
            return getdata
        } else {
            return `No ${getType} found`
        }
    } catch (error) {
        throw error
    }
}

export const addLocalData = async (addType, data) => {
    try {
        await AsyncStorage.mergeItem(`${addType}`, data)

    } catch (error) {
        throw error
    }
}

export const removeLocalData = async (removeType) => {
    try {
        await AsyncStorage.removeItem(`${removeType}`)
    } catch (error) {
        throw error
    }
}

export const multisetLocalData = async(...store) =>{
    try{
        await AsyncStorage.multiSet([...store])
    }catch(error){
        throw error
    }
}