import { API, Characteristic, Formats, Perms, Service, Units } from 'homebridge';

/**
 * Defines the display name of the characteristic.
 */
const DISPLAY_NAME = 'Custom Duration';

/**
 * Defines the UUID of the characteristic.
 * @remarks You need to generate a new UUID for each characteristic.
 */
const UUID = 'b1c8b5a4-ad47-44c4-a50d-18f4bc92737b';

/**
 * Attaches the 'Custom Duration' characteristic to the service.
 * @param target The service to which the characteristic should be attached.
 * @param api The Homebridge {@link API} instance in use for the plug-in.
 * @returns The {@link Characteristic} instance.
 */
export function attachCustomDurationCharacteristic(target: Service, api: API): Characteristic {
  let result: Characteristic;

  if (target.testCharacteristic(DISPLAY_NAME)) {
    result = target.getCharacteristic(DISPLAY_NAME)!;
  } else {
    result = target.addCharacteristic(new api.hap.Characteristic(DISPLAY_NAME, UUID, {
      format: Formats.UINT32,
      perms: [ Perms.PAIRED_READ, Perms.NOTIFY ],
      unit: Units.SECONDS,
    }));
  }

  return result;
}