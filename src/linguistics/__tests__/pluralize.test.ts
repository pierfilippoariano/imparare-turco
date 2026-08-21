import { pluralize } from "../pluralize"

test("pluralize()", () => {
  expect(pluralize("kedi")).toEqual("kediler")
  expect(pluralize("köpek")).toEqual("köpekler")
  expect(pluralize("araba")).toEqual("arabalar")
  expect(pluralize("balık")).toEqual("balıklar")
  expect(pluralize("menü")).toEqual("menüler")
  expect(pluralize("gazete")).toEqual("gazeteler")
})
