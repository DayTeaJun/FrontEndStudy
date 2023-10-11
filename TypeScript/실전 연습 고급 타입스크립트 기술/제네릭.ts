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
// 클래스명 뒤에 제네릭 인자를 넣고 props를 통해 타입을 여러가지 형태로 변형할 수 있음
export class Component<T> {
  private props: T;

  constructor(props: T) {
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
