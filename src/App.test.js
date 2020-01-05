const reducer = (accumulator, currentValue) => accumulator + currentValue;

function sumaMultiplos(max) {
  const multiplos = new Set();
  for (var i = 1; i < max; i++) {
    if (i % 3 === 0) multiplos.add(i);
    else if (i % 5 === 0) multiplos.add(i);
  }

  // console.log(multiplos);

  return [...multiplos].reduce(reducer, 0);
}
test("ejercicio ejemplo 1", () => {
  const suma = sumaMultiplos(10);
  expect(suma).toBe(23);
});

test("ejercicio ejemplo 2", () => {
  const suma = sumaMultiplos(15);
  expect(suma).toBe(45);
});

test("ejercicio ejemplo 3", () => {
  const suma = sumaMultiplos(1000);
  expect(suma).toBe(233168);
});

function sumaFibosEven(max) {
  let ult = 2;
  let penult = 1;

  let suma = 0;

  do {
    // console.log("ult", ult, "penult", penult);
    if (ult % 2 === 0) suma += ult;
    let x = ult;
    ult = ult + penult;
    penult = x;
  } while (ult < max);

  return suma;
}

test("Fibonacci 1", () => {
  const suma = sumaFibosEven(10);
  expect(suma).toBe(10);
});

test("Fibonacci 2", () => {
  const suma = sumaFibosEven(20);
  expect(suma).toBe(10);
});

test("Fibonacci 3", () => {
  const suma = sumaFibosEven(4_000_000);
  expect(suma).toBe(10);
});
