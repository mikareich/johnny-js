import syntaxAnalysis from '../code-analysis/syntaxAnalysis'

test('Splits comments correctly', () => {
  const program = `
        ; comment 1
        1234 ; comment 2
        1234; comment 3
        1234;comment 4
    `
  const syntaxElements = syntaxAnalysis(program)

  expect(syntaxElements).toHaveLength(4)
  expect(syntaxElements[0].comment).toBe('comment 1')
  expect(syntaxElements[1].comment).toBe('comment 2')
  expect(syntaxElements[2].comment).toBe('comment 3')
  expect(syntaxElements[3].comment).toBe('comment 4')
})
