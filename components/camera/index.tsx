import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {forwardRef, useImperativeHandle, useState} from "react";
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// @ts-ignore
const Camera = forwardRef(({ visible, onClose, onCapture }, ref) => {
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    useImperativeHandle(ref, () => ({
        takePicture: async () => {
            if (cameraRef) {
                // @ts-ignore
                const photo = await cameraRef.takePictureAsync({
                    base64: true,
                    quality: 1,
                    scale: 1
                });
                onCapture(photo);
                onClose();
            }
        },
    }));

    if (!permission) {
        // Camera permissions are still loading.
        return null;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
                <View style={styles.container}>
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <Button onPress={requestPermission} title="Grant Permission" />
                </View>
            </Modal>
        );
    }

    return <Modal visible={visible}>
                <View style={styles.container}>
                    <CameraView
                            ref={(ref) => setCameraRef(ref)}
                            style={styles.camera}
                            facing={facing}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}
                                  onPress={() => ref.current.takePicture()}>
                                <Text style={styles.text}>Capture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onClose}>
                                <Text style={styles.text}>Close Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>
            </Modal>
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

Camera.defaultProps = {
    visible: false
}

export default Camera;