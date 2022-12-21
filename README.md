# Homebridge Example of Custom Characteristics
This example uses typescript and custom characteristics.

A couple things to mention:
- `Custom Duration` is the custom characteristic exposed by [customDuration.ts](src/characteristics/customDuration.ts)
  - Because Homebridge does not expose the `Characteristic` type from `hap-nodejs` and Homebridge also signals a warning when directly referencing `hap-nodejs` as a dependency you will need to use the hap instance passed into your plug-in constructor.
  - The characteristic can then be attached to any Homebridge service instance.
- The `ExamplePlatformAccessory` makes use of the `Custom Duration` characteristic and adds it to the `LightBulb` service.
- Your custom characteristic will **NOT** be visible within the Apple Home app. You will need a 3rd party app (such as Eve or Controller for HomeKit) to view it.

The function below demonstrates the mechanism to attach a custom characteristic:
```typescript
import { API, Characteristic, Formats, Perms, Service, Units } from 'homebridge';

const DISPLAY_NAME = 'Custom Duration';
const UUID = 'b1c8b5a4-ad47-44c4-a50d-18f4bc92737b';

export function attachCustomDurationCharacteristic(target: Service, api: API): Characteristic {
  let result: Characteristic;

  if (target.testCharacteristic(DISPLAY_NAME)) {
    result = target.getCharacteristic(DISPLAY_NAME)!; // Already tested it exists
  } else {
    result = target.addCharacteristic(new api.hap.Characteristic(DISPLAY_NAME, UUID, {
      format: Formats.UINT32,
      perms: [ Perms.PAIRED_READ, Perms.NOTIFY ],
      unit: Units.SECONDS,
    }));
  }

  return result;
}
```
Also, do **NOT** use the value mentioned above, you should generate your own.
