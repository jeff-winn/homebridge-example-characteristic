import { API, CharacteristicEventTypes, CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { attachCustomDurationCharacteristic } from './characteristics/customDuration';

import { ExampleHomebridgePlatform } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class ExamplePlatformAccessory {
  private service: Service;

  /**
   * These are just used to create a working example
   * You should implement your own code to track the state of your accessory
   */
  private exampleStates = {
    On: false,
    Brightness: 100,
  };

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly api: API,
    private readonly accessory: PlatformAccessory,
  ) {
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below
    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below

    // *******************************************************************
    // THIS IS THE CUSTOM CHARACTERISTIC BEING SETUP
    // *******************************************************************
    attachCustomDurationCharacteristic(this.service, this.api)
      .on(CharacteristicEventTypes.GET, this.getCustomValue.bind(this));   // GET - bind to the 'getCustomValue' method below.
  }

  /**
   * This is the method that gets bound to the custom duration characteristic.
   * @returns The custom duration.
   */
  getCustomValue(): CharacteristicValue {
    // This method can work like any other method to get the characteristic value.
    return 1000;
  }

  async setOn(value: CharacteristicValue) {
    this.exampleStates.On = value as boolean;
    this.platform.log.debug('Set Characteristic On ->', value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const isOn = this.exampleStates.On;

    this.platform.log.debug('Get Characteristic On ->', isOn);
    return isOn;
  }

  async setBrightness(value: CharacteristicValue) {
    this.exampleStates.Brightness = value as number;
    this.platform.log.debug('Set Characteristic Brightness -> ', value);
  }
}
