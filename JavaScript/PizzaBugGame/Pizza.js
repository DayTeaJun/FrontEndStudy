class Pizza {
  constructor() {
    this.pos = new Tile(10, 20);
  }

  renderPizza() {
    this.pos.renderImg();
  }

  // 피자 위치 조정
  movePizza() {
    // 타일 위치, 타일크기만큼 곱함
    // 1을 더한 이유는 지렁이가 벽에 부딪히면 GameOver가 되야하기 때문
    // -2를 한 이유는 피자가 가장자리를 피해서 생성이 되게 하기 위함.
    const col = Math.floor(Math.random() * tileWidth - 2) + 1;
    const row = Math.floor(Math.random() * tileHeight - 2) + 1;
    this.pos = new Tile(col, row);
  }
}
