// 참고 : https://im-developer.tistory.com/209

// Partial
// 주어진 Type의 모든 property를 optional로 세팅한 Type을 구성한다.
// 다시 말해 주어진 Type의 모든 부분 집합 type을 return한다. 즉, 아래 Todo interface에 title과 description이 정의되어 있는데, Todo 중에서 일부 속성으로만 이루어진 type을 지정하고 싶을 때, Partial을 사용하면 된다.
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

// Readonly
// Type의 모든 property 속성을 readonly로 세팅한다. 즉, 주어진 모든 property는 재할당 할 수 없다.
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
todo.title = "Hello"; // Error: cannot reassign a readonly property
// 이 utility는 freeze된 객체의 속성을 재할당하거나 하여 런타임에서 에러가 나는 것을 막는 데 사용할 수 있다.
function freeze<T>(obj: T): Readonly<T>;

// Record<K,T>
// Record는 property Type을 K로, value Type을 T로 지정할 수 있다. 특정 property를 다른 type으로 매핑하고 싶을 때 유용하다.
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
// 위 예시를 보면 더 이해하기 쉬운데, 즉, Record<Page, PageInfo>라고 지정한 객체 x는
// key type이 'home' | 'about' | 'contact'여야 하고,
// Value type이 PageInfo여야 한다.

// Pick<T,K>
// 어떤 Type에서 특정 property들인 K를 뽑아서 구성한 타입을 지정한다.
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// Omit<T,K>
// Type에서 특정 property, K를 지운 Type을 구성한다.
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// Exclude<T,U>
// T에서 U에 지정한 모든 property를 제외하고 구성한다.
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// NonNullable<T>
// Type에서 undefined와 null을 제외한 Type만 남긴다.
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]

// Parameters<T>
// function type T의 parameter들의 Type을 tuple로 구성한다.
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>; // []
type T1 = Parameters<(s: string) => void>; // [string]
type T2 = Parameters<<T>(arg: T) => T>; // [unknown]
type T4 = Parameters<typeof f1>; // [{ a: number, b: string }]
type T5 = Parameters<any>; // unknown[]
type T6 = Parameters<never>; // never
type T7 = Parameters<string>; // Error
type T8 = Parameters<Function>; // Error

// ConstructorParameters<T>
// 생성자 함수(constructor function)의 모든 parameter들의 Type을 추출하여 tuple로 구성한다. (만약 T가 함수가 아니라면  type은 never가 된다.)
type T0 = ConstructorParameters<ErrorConstructor>; // [(string | undefined)?]
type T1 = ConstructorParameters<FunctionConstructor>; // string[]
type T2 = ConstructorParameters<RegExpConstructor>; // [string, (string | undefined)?]

// ReturnType<T>
// function T의 return type을 구성한다.
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<typeof f1>; // { a: number, b: string }
type T5 = ReturnType<any>; // any
type T6 = ReturnType<never>; // any
type T7 = ReturnType<string>; // Error
type T8 = ReturnType<Function>; // Error

// InstanceType<T>
// 생성자 함수(constructor function) T의 instance type을 구성한다.
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>; // C
type T1 = InstanceType<any>; // any
type T2 = InstanceType<never>; // any
type T3 = InstanceType<string>; // Error
type T4 = InstanceType<Function>; // Error

// Required<T>
// 모든 T의 property들을 optional이 아닌 required로 세팅하여 구성한다.
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 }; // OK

const obj2: Required<Props> = { a: 5 }; // Error: property 'b' missing
