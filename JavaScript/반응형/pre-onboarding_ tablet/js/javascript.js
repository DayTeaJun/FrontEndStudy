// tar의 id가 value와 같은지 확인
function checkId(tar, value){
  let returnVal = false;
  if(tar.id == value || tar.parentElement.id == value){
    returnVal = true
  };
  return returnVal;
}
// click한 tar의 상위 엘리먼트의 id가 value과 같은지 확인
function returnTar(tar, value){
  let returnVal = tar;
  if(tar.parentElement.id == value){
    returnVal = tar.parentElement;
  };
  return returnVal;
}

const _gnb = document.querySelector('#gnb');
const _wrap = document.querySelector('#wrap');
const _btnViewMenu = document.querySelector('#viewMenu');

// 메뉴 클릭 동작
function menuClickFn(_tar){
  if(checkId(_tar,'viewMenu')){
    const _menuBtn = returnTar(_tar,'viewMenu');
    if(_gnb.classList.contains('open')){
      // 버튼 애니메이션
      const menuBtnTransitionendFunc = obj=>{
        _menuBtn.removeEventListener('transitionend',menuBtnTransitionendFunc);
        _menuBtn.classList.remove('next_close','close');
      };
      _menuBtn.classList.add('next_close');
      _menuBtn.addEventListener('transitionend',menuBtnTransitionendFunc);
      _gnb.classList.remove('open');

      // 딤드 레이어 애니메이션
      const wrapTransitionendFunc = obj=>{
        _menuBtn.removeEventListener('transitionend',wrapTransitionendFunc);
        _wrap.classList.remove('dimed');
      };
      _menuBtn.addEventListener('transitionend',wrapTransitionendFunc);
      _wrap.classList.remove('active');
    }else{
      // 버튼 애니메이션
      const menuBtnTransitionendFunc = obj=>{
        _menuBtn.removeEventListener('transitionend',menuBtnTransitionendFunc);
        _menuBtn.classList.remove('prev_close');
        _menuBtn.classList.add('close');
      };
      _menuBtn.classList.add('prev_close');
      _menuBtn.addEventListener('transitionend',menuBtnTransitionendFunc);
      _gnb.classList.add('open');
      _wrap.classList.add('dimed','active');
    };
  }
}

window.addEventListener('click',obj =>{
  const _tar = obj.target; 
  menuClickFn(_tar);
});
window.addEventListener('resize',obj =>{
  if( window.matchMedia('(min-width:1024px)').matches ){
    _btnViewMenu.classList.remove('close');
    _gnb.classList.remove('open');
    _wrap.classList.remove('dimed','active');
  }
});