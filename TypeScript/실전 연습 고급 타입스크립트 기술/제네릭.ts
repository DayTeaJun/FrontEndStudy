// 제네릭은 타입에 인자(여러가지 타입들 number, boolean, null, ...)를 넘기고 타입 스페이스에서 사용하기 위함

type ReturnWhatIPassIn<T> = T;

// 제네릭 사용 이유 : 다음과 같이 값을 입력받아서 그대로 리턴하는 함수인데, 하는 역할은 동일함 이때 사용
const intFunction = (i: number) => i;
const stringFunction = (str: string) => str;
const objFunction = (obj: Record<any, any>) => obj;
const boolFunction = (bool: boolean) => bool;

// 제네릭 사용 (위 여러개를 하나로 통합 가능)
const genericFunction = <T>(arg: T) => arg;
const result: number = genericFunction<number>(1);

// 제네릭 기초
const returnWhatIPassIn = <T>(t: T) => {
  return t;
};

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");
// 제네릭의 리턴은 받은 인자 그 자체로 number도 string도 아닌 1 "matt" 이다.
type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];

// 위처럼 제네릭은 타입 파리미터에 따라 계속해서 값이 변경되는데, 이걸 제한해 줄 수 있다.
export const returnWhatIPassIn = <T extends string>(t: T) => t;
// extends는 타입 파라미터의 타입을 제한해 줄 수 있다.
const a = returnWhatIPassIn("a");

type test1 = Expect<Equal<typeof a, "a">>;

// 아래는 아규먼트(인수)가 위의 제네릭에서 extends 로 string으로 제한을 두었기 때문에 에러가 난다.
// @ts-expect-error
returnWhatIPassIn(1);

// @ts-expect-error
returnWhatIPassIn(true);

// @ts-expect-error
returnWhatIPassIn({
  foo: "bar",
});

// 다수의 타입인자 제네릭
const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => {
  // T1, T2로 다수의 타입 파리미터를 받게함 (다양한 타입을 받을 수 있음)
  return {
    first: params.a,
    second: params.b,
  };
};

it("Should return an object where a -> first and b -> second", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  });

  expect(result).toEqual({
    first: "a",
    second: 1,
  });

  type test1 = Expect<
    Equal<
      typeof result,
      {
        first: string;
        second: number;
      }
    >
  >;
});

// 다수의 타입인자 2
// 위의 value space에서 화살표함수인 경우에는 함수앞에 붙여야하지만
// 아래의 type space는 타입 이름 뒤에 붙여야한다.
type CreateDataShape<T1, T2> = {
  data: T1;
  error: T2;
};

type tests = [
  Expect<
    Equal<
      CreateDataShape<string, TypeError>,
      {
        data: string;
        error: TypeError;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<number, Error>,
      {
        data: number;
        error: Error;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];

// 기본(default) 타입 인자
// 함수 파라미터에 디폴트 값을 넣는 것처럼 기본 값을 넣어 줄 수 있음
type CreateDataShape<TData, TError = undefined> = {
  data: TData;
  error: TError;
};

type tests = [
  Expect<
    Equal<
      CreateDataShape<string>,
      {
        data: string;
        error: undefined;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];

// 제네릭 클래스
// 클래스명 뒤에 제네릭 타입 인자를 넣고 props를 통해 타입을 여러가지 형태로 변형할 수 있음
export class Component<T> {
  // 3. 아래와 마찬가지로 같은 타입이 들어왔기 때문에 T로 타입 지정
  private props: T;

  // 1. 아래 인스턴스 만들 때의 인자 타입이 T에 대입이 된다.
  constructor(props: T) {
    // 2. 위에 입력받은 props로 할당한다.
    this.props = props;
  }

  getProps = () => this.props;
}

it("Should create an object containing props", () => {
  // 아래 클래스 인스턴스를 생성할 때 인자에 따라 타입이 유동적으로 바뀌게 할 수 있음
  const component = new Component({ a: 1, b: 2, c: 3 });

  const result = component.getProps();

  expect(result).toEqual({ a: 1, b: 2, c: 3 });

  type tests = [
    Expect<Equal<typeof result, { a: number; b: number; c: number }>>
  ];
});

// 타입 스페이스에서의 rest parameter
// T의 타입문자를 함수로 제한하고 여러 인자가 들어와 지도록 rest parameter(...) 사용
type GetParametersAndReturnType<T extends (...args: any) => any> = {
  params: Parameters<T>;
  returnValue: ReturnType<T>;
};

type tests = [
  Expect<
    Equal<
      GetParametersAndReturnType<() => string>,
      { params: []; returnValue: string }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(s: string) => void>,
      { params: [string]; returnValue: void }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(n: number, b: boolean) => number>,
      { params: [number, boolean]; returnValue: number }
    >
  >
];

// 타입스페이스 empty object
// extends를 빈 객체{} 로만 한정하면, null, undefined만 에러를 띄우고 나머지는 에러를 띄우지 않게 해준다.
export type Maybe<T extends {}> = T;

type tests = [
  // @ts-expect-error
  Maybe<null>,
  // @ts-expect-error
  Maybe<undefined>,

  Maybe<string>,
  Maybe<false>,
  Maybe<0>,
  Maybe<"">
];

// NonEmptyArray 타입 만들기
// 아래에서 string을 넘겨주기 때문에 타입 인자 <T> 넣고
// string 타입의 요소를 받고 최소 한개의 인자가 필요한 T와 spread array로 여러개까지 가능하게 변경
type NonEmptyArray<T> = [T, ...Array<T>];

export const makeEnum = (values: NonEmptyArray<string>) => {};

// 최소 한개의 array가 있는지 확인하는 함수
makeEnum(["a"]);
makeEnum(["a", "b", "c"]);

// 최소 한개 이상의 요소가 있어야 한다는 타입을 위에서 만들었기 때문에, 에러가 발생
makeEnum([]);

// Reduce 타입 파라미터 문제 2가지 방법
const array = [
  {
    name: "Park",
  },
  {
    name: "Kim",
  },
];

// 1. 맨 아래 tests 코드의 Record<string, { name: string }> 조건을 그대로 복사해 reduce에 타입을 지정해도 된다.
const obj = array.reduce<Record<string, { name: string }>>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

// 2. 또는, as(Assertion 타입 단언)를 이용해서 타입을 언제나 다음과 같은 타입으로 반환하겠다로 지정해도 된다.
const obj2 = array.reduce((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {} as Record<string, { name: string }>);

it("Should resolve to an object where name is the key", () => {
  expect(obj).toEqual({
    Park: {
      name: "Park",
    },
    Kim: {
      name: "Kim",
    },
  });

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});

// Fetch 함수 타입 문제
// fetch에 받을 타입 인자를 T로 지정하여 여러 타입들을 받을 수 있도록 유동성있게 설정
const fetchData = async <T>(url: string) => {
  // data의 타입이 위에 타입 파라미터로 받게한 T로 타입을 재사용성있게 만듦
  const data: T = await fetch(url).then((response) => response.json());
  return data;
};

it("Should fetch data from an API", async () => {
  // 결과적으로 타입인자에 name: string을 넣어 data 타입을 유동적으로 변경함
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1"
  );
  expect(data.name).toEqual("Luke Skywalker");

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});
