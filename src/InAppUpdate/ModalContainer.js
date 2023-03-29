
import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

export default function ModalContainer({
    isVisible,
    backdropColor,
    backdropOpacity,
    animationIn,
    animationOut,
    onBackdropPress,
    onBackButtonPress,
}) {
    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={backdropOpacity ?? 0.5}
            backdropColor={backdropColor}
            onBackdropPress={() => {
                onBackdropPress();
            }}
            onBackButtonPress={() => {
                onBackButtonPress();
            }}
            animationIn={animationIn ?? 'slideInUp'}
            animationOut={animationOut ?? 'slideOutDown'}
            backdropTransitionInTiming={1}
            animationInTiming={200}
            animationOutTiming={1}
            useNativeDriver={true}>
            <View
                style={{
                    backgroundColor: "red",
                    height: "100%"
                }}>
                <Text>asdkasnkj</Text>
            </View>
        </Modal>
    );
}
