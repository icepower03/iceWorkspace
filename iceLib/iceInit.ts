import { xClass, xConfig, xConfigPage } from './V2/iceBase';

export const xLib = {
    init(config: xConfig, pageConfig: xConfigPage): void {
        xClass.config = config;
        xClass.localConfig = pageConfig;
    }
};
