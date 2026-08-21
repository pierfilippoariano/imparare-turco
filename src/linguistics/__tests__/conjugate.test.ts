import { makeInfinitive, makePresentProgressive, SUBJECTS } from "../conjugate"

test("makeInfinitive()", () => {
  expect(makeInfinitive("yap")).toEqual("yapmak")
  expect(makeInfinitive("ye")).toEqual("yemek")
  expect(makeInfinitive("iç")).toEqual("içmek")
})

test("makePresentProgressive()", () => {
  expect(makePresentProgressive("yap", SUBJECTS.FIRST_PERSON_SINGULAR)).toEqual("yapıyorum")
  expect(makePresentProgressive("ye", SUBJECTS.SECOND_PERSON_PLURAL)).toEqual("yiyorsunuz")
  expect(makePresentProgressive("ağrı", SUBJECTS.THIRD_PERSON_PLURAL)).toEqual("ağrıyorlar")
  expect(makePresentProgressive("anla", SUBJECTS.SECOND_PERSON_PLURAL)).toEqual("anlıyorsunuz")
})
