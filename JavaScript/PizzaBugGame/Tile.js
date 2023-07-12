// 파일 명이 Tile 대문자로 시작하는 이유는 클래스로 작성할려고 하기 때문

class Tile {
  constructor(col, row) {
    // 타일이 맨처음 생성될 좌표
    this.col = col;
    this.row = row;

    // 바둑판(알)의 위치 (현재 좌표에 타일 사이즈를 곱해줌)
    this.posX = this.col * tileSize;
    this.posY = this.row * tileSize;
  }

  // 클래스 내의 함수는 function 없어도 됨
  // 인자를 받아오는데 받아오지 않으면 초기값을 쓰도록 설정
  renderTile(bg = "green") {
    ctx.fillStyle = bg;
    // 캔버스에 네모로 채우는 방법
    // 좌표 및 너비
    ctx.fillRect(this.posX, this.posY, tileSize, tileSize);
  }

  renderImg(bg = "./pizza.png") {
    // 자바스크립트 내장함수로 Image 요소를 메모리상에서 만들어주는 생성자 함수
    // tileSize 너비의 이미지를 만듦
    const image = new Image(tileSize, tileSize);
    image.src = bg;

    // 이미지가 로드되고 나면 실행되는 이벤트리스너 생성
    image.addEventListener("load", () => {
      // 피자이미지는 canvasBg에 렌더링할 것임
      // 이미지를 ctxBg에 그려줌
      ctxBg.drawImage(image, this.posX, this.posY, tileSize, tileSize);
    });
  }

  // 타일의 충돌 체크 함수
  collisionCheck(target) {
    // 마지막 true값을 반환하여 돌림
    return this.col === target.col && this.row == target.row;
  }
}
