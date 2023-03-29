import React from "react";
import { Text } from "react-native";
import ModalContainer from './ModalContainer';
import useCheckForUpdate from './useCheckForUpdate';

export default function InAppUpdate() {

    const { modalVisible, setModalVisible, forcedUpdate, startUpdating } = useCheckForUpdate();

    return (
        <ModalContainer
            isVisible={modalVisible}
            onBackdropPress={() => !forcedUpdate && setModalVisible(false)}
            onBackButtonPress={() => !forcedUpdate && setModalVisible(false)}
            modalContainerStyle={{
                height: 300,

            }}
        >
            <Text>
                This us modal
            </Text>
        </ModalContainer>
    );
}