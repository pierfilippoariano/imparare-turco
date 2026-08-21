import { makeAccusative, makeDative, makeLocative, makeAblative, makeGenitive } from "../nounCases"

test("makeAccusative()", () => {
  expect(makeAccusative("kedi")).toEqual("kediyi")
  expect(makeAccusative("köpek")).toEqual("köpeği")
  expect(makeAccusative("araba")).toEqual("arabayı")
  expect(makeAccusative("balık")).toEqual("balığı")
  expect(makeAccusative("menü")).toEqual("menüyü")
  expect(makeAccusative("gazete")).toEqual("gazeteyi")
  expect(makeAccusative("yumurta")).toEqual("yumurtayı")
})

test("makeGenitive()", () => {
  expect(makeGenitive("kedi")).toEqual("kedinin")
  expect(makeGenitive("havalimanı")).toEqual("havalimanının")
})

// Nell'originale questi casi erano chiamati (a torto) "dative" -> ora si
// chiama correttamente makeLocative (-DA, stato in luogo: "evde" = in casa).
test("makeLocative()", () => {
  expect(makeLocative("park")).toEqual("parkta")
  expect(makeLocative("banka")).toEqual("bankada")
  expect(makeLocative("restoran")).toEqual("restoranda")
  // Regression test: the original engine's UNVOICED_CONSONANTS list was
  // missing p/f/s/h, so it produced "kitapda" instead of the correct
  // "kitapta". See harmony.ts.
  expect(makeLocative("kitap")).toEqual("kitapta")
})

// Il vero dativo (-(y)A, moto a luogo: "eve" = verso casa) mancava del tutto
// nell'originale: aggiunto da zero.
test("makeDative()", () => {
  expect(makeDative("ev")).toEqual("eve")
  expect(makeDative("kitap")).toEqual("kitaba")
  expect(makeDative("araba")).toEqual("arabaya")
  expect(makeDative("okul")).toEqual("okula")
})

test("makeAblative()", () => {
  expect(makeAblative("park")).toEqual("parktan")
  expect(makeAblative("banka")).toEqual("bankadan")
  expect(makeAblative("restoran")).toEqual("restorandan")
  expect(makeAblative("kitap")).toEqual("kitaptan")
})
