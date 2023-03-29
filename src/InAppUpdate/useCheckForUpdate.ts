import { useEffect, useState } from 'react';
import SpInAppUpdates, {
  StatusUpdateEvent,
  NeedsUpdateResponse,
  IAUUpdateKind,
  //@ts-ignore
} from 'sp-react-native-in-app-updates';

enum AndroidInstallStatus {
  UNKNOWN = 0,
  PENDING = 1,
  DOWNLOADING = 2,
  INSTALLING = 3,
  INSTALLED = 4,
  FAILED = 5,
  CANCELED = 6,
  DOWNLOADED = 11,
}

const useCheckForUpdate = () => {
  const [forcedUpdate, setForcedUpdate] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const currentVersion = 149

  const inAppUpdates = new SpInAppUpdates(
    false, // isDebuggetVe
  );

  const checkForUpdates = () => {

    setModalVisible(true)
    return
    try {
      inAppUpdates.checkNeedsUpdate({}).then((result: NeedsUpdateResponse) => {
        // force update handler
        let isForcedUpdateAvailable = true

        if (isForcedUpdateAvailable) {
          setForcedUpdate(true);
          setModalVisible(true);
          return;
        }
        // for soft update handler
        softUpdateHandler(Number(result?.storeVersion));
      });
    } catch (error) {

    }
  };

  const softUpdateHandler = async (storeVersion: number) => {

    if (storeVersion > currentVersion) {
      setModalVisible(true);
    }
  };

  const startUpdating = () => {
    try {
      if (modalVisible) {
        let updateType = IAUUpdateKind.IMMEDIATE;
        inAppUpdates.addStatusUpdateListener(onStatusUpdate);
        inAppUpdates.startUpdate({
          updateType, // android only, on iOS the user will be promped to go to your app store page
        });
      }
    } catch (error) {
      // redirectToStore(); //android or apple store
    }
  };

  const onStatusUpdate = (status: StatusUpdateEvent) => {
    if (status.status === AndroidInstallStatus.INSTALLED) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  return {
    modalVisible,
    setModalVisible,
    forcedUpdate,
    startUpdating,
  };
};

export default useCheckForUpdate;
