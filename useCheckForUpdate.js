import { useEffect, useState } from 'react';
import { Platform, Linking } from 'react-native';
import SpInAppUpdates, {
    StatusUpdateEvent,
    NeedsUpdateResponse,
    IAUUpdateKind,
    UPDATE_TYPE
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
let HIGH_PRIORITY_UPDATE = 3

const useCheckForUpdate = () => {
    const [forcedUpdate, setForcedUpdate] = useState < boolean > (false);
    const [modalVisible, setModalVisible] = useState < boolean > (false);

    // const currentVersion = 149;
    // const recommendedVersion = 1;

    const inAppUpdates = new SpInAppUpdates(
        false, // isDebug
    );

    const checkForUpdates = () => {
        return
        try {
            inAppUpdates.checkNeedsUpdate({}).then((result: NeedsUpdateResponse) => {

                let updateType = result.other.updatePriority >= HIGH_PRIORITY_UPDATE
                    ? UPDATE_TYPE.IMMEDIATE
                    : UPDATE_TYPE.FLEXIBLE;

                if (result.shouldUpdate) {
                    setModalVisible(true)
                }

                // force update handler
                // let isForcedUpdateAvailable = recommendedVersion > currentVersion;

                // // force / sofft

                // if (isForcedUpdateAvailable) {
                //     setForcedUpdate(true);
                //     setModalVisible(true);
                //     return;
                // }
                // for soft update handler

                // do anything here
            });
        } catch (error) {
            redirectToStore(); //android or apple store

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
            redirectToStore(); //android or apple store
        }
    };

    const onStatusUpdate = (event: StatusUpdateEvent) => {
        if (event.status === 4) {
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

export const redirectToStore = () => {
    // if (Platform.OS === 'android') {
    //     Linking.openURL('market://details?id=com.pillow.fund');
    // } else {
    //     const link = 'appleStoreLink';
    //     Linking.canOpenURL(link).then(
    //         supported => {
    //             supported && Linking.openURL(link);
    //         },
    //         err => console.log(err),
    //     );
    // }
};
