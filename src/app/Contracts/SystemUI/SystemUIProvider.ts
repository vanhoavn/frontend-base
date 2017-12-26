import VueType, * as Vue from 'vue';

import {SystemUIBaseOptions} from './types/SystemUIBaseOptions';
import {SystemUIAlertOptions} from './types/SystemUIAlertOptions';
import {SystemUIConfirmOptions} from './types/SystemUIConfirmOptions';
import {SystemUINotificationOptions} from './types/SystemUINotification';

export {SystemUIBaseOptions, SystemUIAlertOptions, SystemUIConfirmOptions, SystemUINotificationOptions};

export interface SystemUIProvider {
    $alert(option: SystemUIAlertOptions);

    $confirm(option: SystemUIConfirmOptions);

    $notify(option: SystemUINotificationOptions);
};
