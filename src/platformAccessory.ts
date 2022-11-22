import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { CustomCharacteristics } from './customCharacteristics';

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
    // THIS IS THE CUSTOM CHARACTERISTIC BEING USED
    // *******************************************************************
    if (this.service.testCharacteristic(CustomCharacteristics.My)) {
      // The characteristic already exists on the service, use it.
      this.service.getCharacteristic(CustomCharacteristics.My).onGet(this.getCustomValue.bind(this));
    } else {
      // The characteristic does not already exist on the service, add it and then use it.
      this.service.addCharacteristic(CustomCharacteristics.My).onGet(this.getCustomValue.bind(this));
    }
  }

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
