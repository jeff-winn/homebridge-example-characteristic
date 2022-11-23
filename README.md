# Homebridge Example of Custom Characteristics
This example uses typescript and custom characteristics.

A couple things to mention:
- The CustomDuration class is the custom characteristic.
- The MyCustomCharacteristics class does nothing aside from maintain the available types of characteristics in your project.
  - It is not necessary, you can reference your characteristic directly by using 'CustomDuration' if you choose.
- The ExamplePlatformAccessory makes use of the CustomDuration characteristic and adds it to the LightBulb service.