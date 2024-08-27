import * as ImagePicker from 'expo-image-picker';

const pickImage = async (setLoading: any, allowsMultipleSelection: boolean) => {
    setLoading(true);

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: allowsMultipleSelection,
        aspect: [4, 3],
        base64: true,
        quality: 1
    });

    setLoading(false);
    if(!result.canceled){
        if(allowsMultipleSelection){
            return result.assets;
        }else{
            return result.assets[0];
        }
    }else{
        return null;
    }
}

export {
    pickImage
}