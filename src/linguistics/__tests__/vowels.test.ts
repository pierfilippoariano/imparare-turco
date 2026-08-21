import { getLastVowel } from "../vowels"

test("getLastVowel", () => {
  expect(getLastVowel("kitap")).toBe("a")

  expect(() => getLastVowel("dlr")).toThrow()
})
