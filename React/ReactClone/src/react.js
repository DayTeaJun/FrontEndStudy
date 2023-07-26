// 리액트 createElement를 실제로 만들어본다. 가상돔 만들기
function createElement(tag, props, ...children) {
  // 첫번째 인자로 받아올 때(tag), 함수인지 문자열인지 구별을 해줘야 제대로 동작함
  if (typeof tag === "function") {
    // ...children을 그대로 적으면 [] 배열로 넘어감
    // apply 메서드는 여러개의 인자를 매칭해서(이때는 매칭할 것이 없으니, null로 설정) 하나하나 담아준다. 그러면 함수를 실행 했을 때와 똑같은 결과가 나옴 원래 하고자 했던 tag(props, children여러개) 가 됨
    // return tag.apply(null, [props, ...children]);
    return tag(null, props, ...children);
  }
  return { tag, props, children };
}

function renderDom(vDom) {
  // vDom이 문자열이라면 텍스트 추가
  if (typeof vDom === "string") {
    return document.createTextNode(vDom);
  }

  const el = document.createElement(vDom.tag);
  // createElement('div') 만든 것처럼 똑같음

  console.log(vDom);

  vDom.children
    .map((el) => {
      return renderDom(el);
    })
    .forEach((realEl) => {
      el.append(realEl);
    });
  // map을 이용하여 재귀함수를 만듦, 반복이 끝나면 배열을 전달하고, 최종적으로 el의 자식에 realEl를 계속해서 붙임(메서드 체이닝)

  return el;
  // 이러면 버츄얼 돔이 러얼 돔으로 바뀜
}

function render(element, container) {
  container.append(renderDom(element));
}

export { createElement, render };
