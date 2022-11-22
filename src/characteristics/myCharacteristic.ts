import { Characteristic, Formats, Units, Perms } from 'hap-nodejs';

/**
 * Defines the custom characteristic.
 */
export class MyCharacteristic extends Characteristic {
  /**
   * You need to generate a new UUID for each characteristic.
   */
  public static readonly UUID = 'b1c8b5a4-ad47-44c4-a50d-18f4bc92737b';

  constructor() {
    super('Custom Duration', MyCharacteristic.UUID, {
      format: Formats.UINT32,
      perms: [ Perms.PAIRED_READ, Perms.NOTIFY ],
      unit: Units.SECONDS,
    });
  }
}