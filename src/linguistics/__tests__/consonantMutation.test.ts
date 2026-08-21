import { mutateFinalConsonant } from "../consonantMutation"

test("consonantMutation()", () => {
  expect(mutateFinalConsonant("kitap")).toEqual("kitab")
  expect(mutateFinalConsonant("kedi")).toEqual("kedi")
})
