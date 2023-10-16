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

// 타입스페이스의 조건 타입
type YouSayGoodbyeAndISayHello<T> = T extends "hello" ? "goodbye" : "hello";
// 타입스크립트의 삼항연산자는 extends를 이용하여 T의 오른쪽이 포함되는지에 따른 여부로 조건 타입을 설정할 수 있다.

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>
];

// 조건 타입에서 never(항상 오류거나 리턴 값을 절대로 내보내지 않는 리턴 타입)
// 다중 삼항 연산자 사용
type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye"
  ? T extends "hello"
    ? "goodbye"
    : "hello"
  : never;

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"alright pal">, never>>,
  Expect<Equal<YouSayGoodbyeAndISayHello<1>, never>>
];

// 조건 타입으로 Object 키 새로 만들기
interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

type OnlyIdKeys<T> = {
  // Key 조건을 extends로 템플릿 리터럴 사용하여 키 들중 뒤에 id 및 Id가 포함된 키만 골라야 하고 앞에는 string 타입이 올 수도 안 올 수도 있기 때문에 설정해준다.
  // 앞의 조건이 충족하면 그대로 Key를 뽑고 아니면 배제시킨다.
  // value는 넘겨준 T의 value를 접근하여 값을 그대로 나태내준다.
  [K in keyof T as K extends `${string}${"id" | "Id"}` ? K : never]: T[K];
  // never를 넣게 되면 오브젝트나 필드가 제외가 된다. (위의 타입만으로 특정 타입을 가진 키를 추출할 수 있다.)
};

type tests = [
  Expect<
    Equal<
      OnlyIdKeys<Example>,
      {
        id: string;
        organisationId: string;
        groupId: string;
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>
];

// 유용한 Infer
// 객체 data 의 값이 출력되도록 하고, 객체가 아니라면 never로 반환되게 함.
// T가 data의 타입의 형태일 때, data안의 특정 타입을 리턴, 아니면 never리턴
type GetDataValue<T> = T extends { data: infer T2 } ? T2 : never;
// infer은 extends에서만 사용가능한 조건문에서 씀,
// infer은 value타입이 어떤게 올지 모르지만 타입스크립트가 자동으로 추론하게 해줌 (만약 아래에 {data: 'hello'} 라면 T2를 'hello'로 추론 )

type tests = [
  Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
  Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >,
  // Expect that if you pass in string, it
  // should return never
  Expect<Equal<GetDataValue<string>, never>>
];

// generics infer
interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
}

type Example = MyComplexInterface<
  "click",
  "window",
  "my-event",
  { x: 12; y: 14 }
>;
// 위 Example의 4번째 파라미터의 타입을 추론해보기
// T에 extends로 MyComplexInterface의 파라미터들 중으로 조건을 걸고, 그중 4번째에 있는 파라미터를 T2로 infer을 사용하여 타입스크립트가 T2의 타입을 추론하여 4번째 파라미터를 반환한다. 4번째의 마지막 파라미터가 없다면 never을 반환한다.
type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer T2>
  ? T2
  : never;

type tests = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];

// Template literals infer
type Names = ["Junsuk Park", "Bill Evans", "Stan Getz", "Foo"];

// Names 타입에서 각 요소의 마지막 단어만 추출하게 하기
// 템플릿 리터럴을 사용하여 타입 파라미터 T를 첫단어 마지막 단어로 나누어 2개 이상으로 나누어진 요소가 있을 경우 마지막 단어를 리턴 없을 경우 never을 리턴한다.
type GetSurname<T> = T extends `${infer FirstName} ${infer LastName}`
  ? LastName
  : never;

type tests = [
  Expect<Equal<GetSurname<Names[0]>, "Park">>,
  Expect<Equal<GetSurname<Names[1]>, "Evans">>,
  Expect<Equal<GetSurname<Names[2]>, "Getz">>,
  Expect<Equal<GetSurname<Names[3]>, never>>
];

// Next.js InferPropsFromSeverSideFuction 타입 만들기
const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// getServerSideProps의 return 값인 props 값의 타입을 리턴하는 값을 추출
// 타입 파리미터의 조건은 getServerSideProps는 함수기 때문에 함수 조건으로 추출하고, 비동기 함수이기 때문에 Promise의 리턴 값인 {props: infer TData}에서 TData를 infer을 사용하여 타입을 추론하게 한다.
// 결과적으로 getServerSideProps 의 리턴 값에서 props의 값이 있으면 그 값의 타입을 반환하고, 없다면 never을 반환한다.
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer TData;
}>
  ? TData
  : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];

// 복잡한 조건 타입
const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// 위의 3가지의 조건을 만족하는 타입을 만들기
// 다중 삼항연산자를 이용하여 parser1,2,3 들이 포함된다면 그 포함된 것의 리턴값의 타입을 반환한다.
type GetParserResult<T> = T extends { parse: () => infer T1 }
  ? T1
  : T extends () => infer T2
  ? T2
  : T extends { extract: () => infer T3 }
  ? T3
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];

// 제네릭 통합 테스트
type UserPath = ["users", ":id"];
type UserOrgPath = ["users", ":id", "orgs", ":orgId"];

type ExtractPathParams<T extends string[]> = T extends [infer T2, ":id"]
  ? { id: T2 }
  : T extends [infer T2, ":id", infer T3, ":orgId"]
  ? { id: T2; orgId: T3 }
  : never;

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<Equal<ExtractPathParams<UserOrgPath>, { id: string; orgId: string }>>
];
