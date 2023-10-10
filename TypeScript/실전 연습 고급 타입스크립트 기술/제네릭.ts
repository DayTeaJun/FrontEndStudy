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
