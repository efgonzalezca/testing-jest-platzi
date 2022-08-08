const Person = require('./06-person');

describe('Test for person', () => {
  let person;
  beforeEach(() => {
    // Arrange / Given
    person = new Person('Efraín', 45, 1.7);
  });

  test('should return down', () => {
    // AAA
    // Arrange / Given
    person.weight = 45;
    // Act / When
    const imc = person.calcIMC();
    // Assert / Then
    expect(imc).toBe('down');
  });
  test('should return normal', () => {
    person.weight = 59;
    const imc = person.calcIMC();
    expect(imc).toBe('normal');
  });
});
