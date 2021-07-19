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
    vypis()
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
    yMikrobit = input.acceleration(Dimension.Y)
    if (yMikrobit < -200) {
        rychlost += Math.map(yMikrobit, -1100, -200, 8, 0)
        if (rychlost > 100) {
            rychlost = 100
        }
    } else if (yMikrobit > 200) {
        rychlost += Math.map(yMikrobit, 200, 1100, 0, -8)
        if (rychlost < -100) {
            rychlost = -100
        }
    }
}
let yMikrobit = 0
let stary_cas = 0
let aktualny_cas = 0
let kompas = 0
let rychlost = 0
serial.redirectToUSB()
joystickbit.initJoystickBit()
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
rychlost = 0
kompas = input.compassHeading()
aktualny_cas = 0
basic.forever(function () {
    nastavit_rychlost()
    nastavit_volant()
    radio.sendValue("v", rychlost)
    radio.sendValue("k", kompas)
    basic.pause(100)
})
