joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        `)
    rychlost = -100
    joystickbit.Vibration_Motor(200)
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("A")
    basic.showLeds(`
        . # # . .
        # . . # .
        # # # # .
        # . . # .
        # . . # .
        `)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
	
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("AB")
    basic.showLeds(`
        . # # # .
        # . # . #
        # # # # .
        # . # . #
        # . # # .
        `)
})
function vypis () {
    aktualny_cas = input.runningTime()
    if (aktualny_cas - stary_cas > 1000) {
        stary_cas = aktualny_cas
        serial.writeLine("rychlost=" + convertToText(rychlost) + ", kompas=" + convertToText(kompas))
    }
}
input.onButtonPressed(Button.B, function () {
    radio.sendString("B")
    basic.showLeds(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `)
})
function nastavit_volant () {
    kompas = input.compassHeading()
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.showLeds(`
        . # # # .
        # # # # #
        # # . # #
        # # # # #
        . # # # .
        `)
    rychlost = 0
    soundExpression.spring.play()
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    basic.showLeds(`
        . # # # .
        # . # . #
        # . # . #
        . . # . .
        . . # . .
        `)
    rychlost = 100
    joystickbit.Vibration_Motor(200)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
	
})
function nastavit_rychlost () {
    y_joystick = joystickbit.getRockerValue(joystickbit.rockerType.X)
    if (y_joystick > 600) {
        rychlost += Math.map(0, 600, 1023, 0, 8)
        if (rychlost > 100) {
            rychlost = 100
        }
    } else if (y_joystick < 450) {
        rychlost += Math.map(y_joystick, 0, 450, -8, 0)
        if (rychlost < -100) {
            rychlost = -100
        }
    }
}
let y_joystick = 0
let kompas = 0
let stary_cas = 0
let aktualny_cas = 0
let rychlost = 0
serial.redirectToUSB()
joystickbit.initJoystickBit()
radio.setGroup(1)
radio.setTransmitPower(7)
rychlost = 0
aktualny_cas = 0
basic.showIcon(IconNames.SmallSquare)
basic.forever(function () {
    nastavit_rychlost()
    nastavit_volant()
    radio.sendValue("v", rychlost)
    radio.sendValue("k", kompas)
    vypis()
    basic.pause(100)
})
