import {SystemUIBaseOptions} from "./SystemUIBaseOptions";

export interface SystemUIConfirmOptions extends SystemUIBaseOptions {
    confirm?: {
        text?: String,
        action?: () => Promise<boolean>,
    }
};
