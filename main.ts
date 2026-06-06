input.onButtonPressed(Button.B, function () {
    if (heben) {
        radio.sendValue("kupplung", 1)
    } else {
        radio.sendValue("kupplung", 0)
    }
    heben = !(heben)
})
let kurve = 0
let gerade = 0
let heben = false
let alt_gerade = -99
let alt_kurve = -99
radio.setGroup(26)
basic.showString("U26")
let g_empfind = 5
let k_empfind = 5
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
let empfind = 4
basic.forever(function () {
    gerade = Math.min(Math.max(input.rotation(Rotation.Pitch), -45), 45)
    gerade = Math.round(gerade / k_empfind) * k_empfind
    // if (gerade < 0)
    // basic.showArrow(ArrowNames.North)
    // else if (gerade > 0)
    // basic.showArrow(ArrowNames.South)
    // if (kurve < 0)
    // basic.showArrow(ArrowNames.West)
    // else if (kurve > 0)
    // basic.showArrow(ArrowNames.East)
    // basic.pause(100)
    kurve = Math.min(Math.max(input.rotation(Rotation.Roll), -45), 45)
    kurve = Math.round(kurve / k_empfind) * k_empfind
    kurve = Math.round(kurve / empfind * 2) * empfind * 2
    if (gerade != alt_gerade || kurve != alt_kurve) {
        // basic.pause(100)
        if (input.buttonIsPressed(Button.A)) {
            radio.sendValue("gerade", gerade)
            radio.sendValue("kurve", kurve / 3)
        } else {
            radio.sendValue("gerade", 0)
            radio.sendValue("kurve", 0)
        }
        alt_gerade = gerade
        alt_kurve = kurve
    }
})
