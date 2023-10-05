// Template literals 타입스크립트
type Path = `/${string}`;

export function makeUrl(path: Path) {
  return `https://mywebsite.com${path}`;
}

// Should be OK
makeUrl("/users");

// 위 타입의 템플릿 리터럴에서 정의한 대로 넘기지 않으면 에러발생
makeUrl("users/1");
// string을 받는 함수를 안전하게 호출하는 것이 가능.
