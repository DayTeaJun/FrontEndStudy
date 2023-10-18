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
