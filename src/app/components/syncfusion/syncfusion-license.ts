import { registerLicense } from '@syncfusion/ej2-base';

declare const SYNCFUSION_LICENSE: string | undefined;

if (typeof SYNCFUSION_LICENSE === 'string' && SYNCFUSION_LICENSE) {
  registerLicense(SYNCFUSION_LICENSE);
}
