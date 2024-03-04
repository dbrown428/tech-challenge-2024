import getPopularArists from "./get-popular-artists"

describe("Artsy", () => {
  test("GraphQL", async () => {
    expect.assertions(2)
    const count = 10
    return getPopularArists(count)
      .then(result => {
        expect(result.isRight()).toBeTruthy()
        result.map(r => expect(r.length).toEqual(count))
      })
  })
})
