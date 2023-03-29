import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import useCheckForUpdate from './useCheckForUpdate';

function App() {
  const {modalVisible, setModalVisible, forcedUpdate, startUpdating} =
    useCheckForUpdate();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="CHECK UPDATE" onPress={toggleModal} />
      <Modal
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        animationOutTiming={500}
        animationInTiming={500}
        style={{justifyContent: 'flex-end', margin: 0}}
        isVisible={modalVisible}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'white',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text>DOWNLOAD AVAILABLE!</Text>
          <Button title="DOWNLOAD ME" onPress={startUpdating} />
        </View>
      </Modal>
    </View>
  );
}

export default App;
