//%color=#444444 blockgap=8 block="SW02"
namespace SW02 {

    let calib_data1: number[] = []

    let abc: number[] = []
    abc[0] = 50

    abc[1] = 10
    let apple: number[] = []

    apple = abc

    apple[1] = 8

    console.logValue("x", apple[3])


    export const BME680_I2C_ADDR = 0X76
    export const BME680_REG_ID = 0xD0
    export const BME680_REG_RESET = 0xE0


    //write8
    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(BME680_I2C_ADDR, buf);
    }

    //read8
    function getreg(reg: number): number {
        pins.i2cWriteNumber(BME680_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME680_I2C_ADDR, NumberFormat.UInt8BE);
    }

    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(BME680_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME680_I2C_ADDR, NumberFormat.Int8LE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME680_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME680_I2C_ADDR, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME680_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME680_I2C_ADDR, NumberFormat.Int16LE);
    }

    function readBlock(reg: number, count: number): number[] {
        let res: number[] = []
        pins.i2cWriteNumber(BME680_I2C_ADDR, reg, NumberFormat.UInt8BE, true);
        for (let i: number = 0; i < (count - 1); i++) {
            res[i] = pins.i2cReadNumber(BME680_I2C_ADDR, NumberFormat.UInt8BE, true)
        }

        res[count - 1] = pins.i2cReadNumber(BME680_I2C_ADDR, NumberFormat.UInt8BE)

        return res
    }

    function reset() {
        setreg(BME680_REG_RESET, 0xB6)
        pause(100)
    }

    function init_BME680() {


    }

    function setHumidityOversampling() {

    }

    function setTemperatureOversampling() {

    }

    function setPressureOversampling() {

    }

    function setIIRFilterSize() {

    }

    function setGasHeater(set_point: number): number {
        return 0
    }

    function initGasSensor(gasHeater: number) {

    }



    function begin(): void {
        if (getreg(BME680_REG_ID) != 0x61) {
            while (true) {
                console.log("SW02 not connected")
                pause(1)
            }
        } else {
            reset();
            init_BME680();
            setHumidityOversampling();
            setTemperatureOversampling();
            setPressureOversampling();
            setIIRFilterSize();
            initGasSensor(setGasHeater(200));
        }
    }

}
