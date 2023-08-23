// h4 글자 바꾸기
let 제목 = document.querySelector("#title");
// 제목.innerHTML = '반가워요' // 안됨 Union type (Element | null) 임
// union type 인 이유 위 요소를 잘찾으면 Element인데, 못찾으면 null 임

// narrowing 방법
// 1. if
if (제목 != null) {
  제목.innerHTML = "반가워요";
}

// 2. instanceof 연산자는 왼쪽에 있는 애가 오른쪽의 자식인지 판별함 true false
if (제목 instanceof Element) {
  // 이방법이 제일 좋음
  제목.innerHTML = "반가워요";
}

// 3. as는 왼쪽 애가 오른쪽의 타입이라고 해주는 것 (자주쓰면 안됨 비상용)
let 제목2 = document.querySelector("#title") as Element;
제목2.innerHTML = "반가워요";

// 4. 오브젝트에 붙이는 ?.
if (제목?.innerHTML) {
  // 또는 if (제목?.innerHTML != undefined)
  // 제목에 innerHTML이 있으면 출력 없으면 undefined (신문법)
  제목.innerHTML = "반가워요";
}

// 5. tsconfig.json 의 strict 모드 끄기

// a태그의 href속성 바꾸기
let 링크 = document.querySelector(".link");
if (링크 instanceof HTMLAnchorElement) {
  링크.href = "https://kakao.com";
  // 에러가 나는 이유는 a태그에 필요한 정확한 타입명 HTMLAnchorElement 가 있기 때문 (HTMLElement 타입은 href 그런 속성 없다는 말)
  // 타입스크립트가 제공하는 타입들 중에 Element 타입을 상속받은 타입들이 있음
  //   HTMLHeadElement
  //   HTMLButtonElement
  // 등 많음 이걸 다 합쳐서 Element 타입이라고 정의함
  // 하나하나 사용할 때 정확히 narrowing 해줘야함
  // HTMLAnchorElement 이건 조금 상세한 타입
  // 이 타입은 "href, style, class, id 이런 속성을 가질 수 있다~" 라고 타입이 정의되어있음
  // 그래서 a태그에게 어울리는 타입인 HTMLAnchorElement 라는 타입을 쓸 수 있는지 instanceof 키워드로 확인해야함
}

// eventListener 부착하기
let 버튼 = document.querySelector("#button");
// ?. 은 버튼에 addEventListener가 가능하면 하고 없으면 undefined를 반환
버튼?.addEventListener("click", function () {
  console.log("눌름");
});

// 해보기
let 이미지 = document.querySelector("#image");
if (이미지 instanceof HTMLImageElement) {
  이미지.src = "new.jpg";
}

let 링크들 = document.querySelectorAll(".naver");

링크들.forEach((item) =>
  item instanceof HTMLAnchorElement
    ? (item.href = "https://kakao.com")
    : undefined
);
