export type SystemUINotificationButtonType = 'closer' | 'sticker';
export type SystemUINotificationAlignOptions = 'right' | 'center' | 'left' | 'justify';

export interface SystemUINotificationConfirmButtonsOptions_ButtonOptions {
    text?: string,
    addClass?: string,
    // Whether to trigger this button when the user hits enter in a single line prompt.
    promptTrigger?: boolean,
    click?: (notice: any, value?: string) => any,
};

export interface SystemUINotificationConfirmButtonsOptions {
    // Make a confirmation box.
    confirm?: boolean,
    // Make a prompt.
    prompt?: boolean,
    // Classes to add to the input element of the prompt.
    prompt_class?: string,
    // The default value of the prompt.
    prompt_default?: string,
    // Whether the prompt should accept multiple lines of text.
    prompt_multi_line?: false,
    // Where to align the buttons. (right, center, left, justify)
    align?: SystemUINotificationAlignOptions,
    buttons?: SystemUINotificationConfirmButtonsOptions_ButtonOptions[],
};

export interface SystemUINotificationOptions {
    title?: String,
    text?: String,
    type?: String,
    delay?: number,
    confirm?: SystemUINotificationConfirmButtonsOptions,
    buttons?: {[name in SystemUINotificationButtonType]: boolean}
};
