export class Dialogs {
    constructor(
        public type: 'confirm' | 'alert' | 'warning' | 'success' | 'error' | 'info',
        public title: string,
        public text: string,
        public textButton: string,
        public textButtonTwo?: string,
        public profit?: string,
        public profit2?: string,
        public value?: number,
    ) {
    }
}

export class DialogsTerms {
    constructor(
        public value?: any,
    ) {
    }
}
