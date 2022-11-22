import { MyCharacteristic } from './characteristics/myCharacteristic';

/**
 * This class isn't exactly necessary, but it does provide a good location to define all of your custom characteristics types.
 */
export class CustomCharacteristics {
  /**
   * Defines the typeof the 'My' characteristic.
   */
  public static readonly My = MyCharacteristic;
}