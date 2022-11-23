# Homebridge Example of Custom Characteristics
This example uses typescript and custom characteristics.

A couple things to mention:
- The ```CustomDuration``` class is the custom characteristic.
- The ```MyCustomCharacteristics``` class does nothing aside from maintain the available types of characteristics in your project.
  - It is not necessary, you can reference your characteristic directly by using ```CustomDuration``` if you choose.
- The ```ExamplePlatformAccessory``` makes use of the ```CustomDuration``` characteristic and adds it to the ```LightBulb``` service.

The custom characteristic defined in this project is documented below:
```typescript
import { Characteristic } from 'hap-nodejs';

export class CustomDuration extends Characteristic {
  public static readonly UUID = 'b1c8b5a4-ad47-44c4-a50d-18f4bc92737b';

  constructor() {
    super('Custom Duration', CustomDuration.UUID, {
      format: Formats.UINT32,
      perms: [ Perms.PAIRED_READ, Perms.NOTIFY ],
      unit: Units.SECONDS,
    });
  }
}
```
The big difference here is the ```Characteristic``` type exported from homebridge cannot be used for your own implementation. You **MUST** import ```Characteristic``` directly from hap-nodejs which actually defines it.

Also, the static readonly UUID field shown above should be unique to every characteristic. Do **NOT** use the value mentioned above, you should generate your own.
