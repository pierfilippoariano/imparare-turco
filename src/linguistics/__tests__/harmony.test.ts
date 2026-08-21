import { harmony2Way, harmony4Way } from "../harmony"

test("harmony2Way", () => {
  expect(harmony2Way("kitap")).toEqual("a")
  expect(harmony2Way("araba")).toEqual("a")
  expect(harmony2Way("menü")).toEqual("e")
  expect(harmony2Way("gül")).toEqual("e")
  expect(harmony2Way("restoran")).toEqual("a")
})

test("harmony4Way", () => {
  expect(harmony4Way("kitap")).toEqual("ı")
  expect(harmony4Way("araba")).toEqual("ı")
  expect(harmony4Way("kedi")).toEqual("i")
  expect(harmony4Way("menü")).toEqual("ü")
  expect(harmony4Way("oyuncu")).toEqual("u")
  expect(harmony4Way("park")).toEqual("ı")
  expect(harmony4Way("temmuz")).toEqual("u")
})
