// .d.ts
// 타입 정의 보관용 파일
// 다른 ts파일에서 import 가능
export type Age22 = number;
export interface Person22 {
  name: string;
}

// .d.ts 파일용도
// 1. 타입정의 따로 보관할 파일이 필요하거나
// 2. 타입 레퍼런스 생성하고 싶으면

// d.ts파일은 자동으로 글로벌 모듈이 아님(다른 모든 ts파일은 글로벌 모듈임)
// 로컬 모듈임
// d.ts파일 글로벌 모듈로 만드는 방법은
// tsconfig.json에 typeRoots : ["./types"] 하면 types의 폴더안의 타입들이 글로벌 모듈로 됨
// 근데 엄청 귀찮은 거 아니면 import export 해라

// 외부라이브러리 사용할 때 타입 정의 안되어 있다면 (제이쿼리 등)
// Definitely Typed github 리포지토리 (대표 외부라이브러리 타입지정한 리포지토리)
// 저 곳에서 d.ts 파일 찾아서 다운받으면됨
// 공식사이트가 더 쉽긴함 (타입스크립트 공식 사이트)
// npm 설치시엔 대부분 타입도 같이 들어옴
// 예를 들어 타입파일이 제공되지 않는 jQuery 같은 경우
// npm install --save @types/jquery
// npm 설치시의 node_modules 폴더안에 @types 폴더에 있는 타입들은 글로벌 모듈임
// 위에 typeRoots : ["./types"] 로 따로 설정해놨으면 @types 포함 안해줌
// 포함할려면 @types 를 추가하거나 아예 typeRoots를 속성 제거하면 자동으로 적용
