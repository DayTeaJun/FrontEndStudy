// rest parameter
// 함수에 어떤 파라미터가 몇개 들어올지 미리 정의가 불가할 때 사용
function 전부더하기(...a: number[]) {
  // rest 파라미터는 항상 [] 안에 담겨오기 때문에 array 타입지정
  console.log(a);
  // [1,2,3,4,5]
}
전부더하기(1, 2, 3, 4, 5);

// spread operator는 괄호 벗길 때 사용
let arr = [3, 4, 5];
let arr2 = [1, 2, ...arr];
console.log(arr2); // [1,2,3,4,5]

// Destructuring (구조 분해 할당)
let { student2, age2 }: { student2: boolean; age2: number } = {
  student2: true,
  age2: 20,
};
// console.log(student2) // true

// 함수 파라미터 객체 destructuring 문법
function 함수({ student, age }: { student: boolean; age: number }): void {
  console.log(student, age); // true 20
}
함수({ student: true, age: 20 });

// 해보기
// 숫자 여러개를 입력하면 최댓값을 return 해주는 함수
// 방법 1
function maxNum(...a: number[]) {
  let maxNumber = a[0];
  for (let i = 0; i < a.length; i++) {
    if (a[i] > maxNumber) {
      maxNumber = a[i];
    }
  }
  return maxNumber;
}
console.log(maxNum(4, 6, 3, 2));
// 방법 2
function 최댓값(...x: number[]) {
  let result = 0;
  x.forEach((i) => {
    if (result < i) {
      result = i;
    }
  });
  return result;
}
console.log(최댓값(4, 6, 3, 2));

// object 자료를 파라미터로 입력할 수 있는 함수
// 방법 1
function 김서방({
  user,
  comment,
  admin,
}: {
  user: string;
  comment: number[];
  admin: boolean;
}): void {
  console.log(user, comment, admin);
}
김서방({ user: "kim", comment: [3, 5, 4], admin: false });

// 방법 2
type UserType = {
  user: string;
  comment: number[];
  admin: boolean;
};

function 함수({ user, comment, admin }: UserType): void {
  console.log(user, comment, admin);
}

함수({ user: "kim", comment: [3, 5, 4], admin: false });

// array 자료를 파라미터로 입력할 수 있는 함수
// 방법 1
function 함수2(a: (number | string | boolean)[]): void {
  a.forEach((i) => console.log(i));
}

// 방법 2
type 어레이 = (number | string | boolean)[];

function 함수([a, b, c]: 어레이) {
  console.log(a, b, c);
}

함수2([40, "wine", false]);
