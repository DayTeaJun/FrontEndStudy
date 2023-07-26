// 리액트 createElement를 실제로 만들어본다. 가상돔 만들기
function createElement(tag, props, ...children) {
  // 첫번째 인자로 받아올 때(tag), 함수인지 문자열인지 구별을 해줘야 제대로 동작함
  if (typeof tag === "function") {
    // ...children을 그대로 적으면 [] 배열로 넘어감
    // apply 메서드는 여러개의 인자를 매칭해서 하나하나 담아준다. 그러면 함수를 실행 했을 때와 똑같은 결과가 나옴 원래 하고자 했던 tag(props, children여러개) 가 됨
    return tag.apply(null, [props, ...children]);
  }
  return {
    tag,
    props,
    children
  };
}
function render(element, container) {
  console.log(element);
}
export { createElement, render };