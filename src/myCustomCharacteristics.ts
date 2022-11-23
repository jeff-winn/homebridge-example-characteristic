import { CustomDuration } from './characteristics/customDuration';

/**
 * This class isn't exactly necessary, but it does provide a good location to define all of your custom characteristics types.
 */
export class MyCustomCharacteristics {
  /**
   * Defines the typeof the 'My' characteristic.
   */
  public static readonly CustomDuration = CustomDuration;
}