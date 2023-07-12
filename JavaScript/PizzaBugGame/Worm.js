class Worm {
  constructor() {
    // 지렁이의 몸통 정보를 배열에 담음
    // 타일의 좌표를 통해 정보를 담음
    this.wormBody = [new Tile(13, 10), new Tile(13, 11), new Tile(13, 12)];
    // 현재 지렁이의 방향 설정
    this.dir = "ArrowUp";
    // 지렁이가 현재 움직인 후에 갈 방향 (맨처음 렌더링됐을때 위로가게 초기값 설정)
    this.dirNext = "ArrowUp";
  }

  renderWorm() {
    this.wormBody.forEach((item) => {
      // 지렁이를 타일에 렌더링함
      item.renderTile();
    });
  }

  // 지렁이의 몸통, 게임 테두리 충돌을 체크함
  // 결국 지렁이의 머리로 판별하여 체크함
  collisionCheck(wormHead) {
    // 게임 화면의 가장 왼쪽 테두리에 지렁이의 머리의 위치가 같아 충돌하게 되면? 방향Edge를 true로 만듦
    const leftEdge = wormHead.col === 0;
    const topEdge = wormHead.row === 0;
    // tileWidth - 1 는 타일 위치 기준점이 왼쪽 상단이기 때문
    // tileWidth를 그대로 넣으면 지렁이의 크기보다 한칸 오른쪽으로 가야 작동됨 (바둑칸의 왼쪽 상단 모서리)
    const rightEdge = wormHead.col === tileWidth - 1;
    const bottomEdge = wormHead.row === tileHeight - 1;

    const collisionEdge = leftEdge || rightEdge || topEdge || bottomEdge;

    // 머리와 몸통이 충돌했는지의 초기값 false
    let collisionBody = false;
    // 지렁이 머리가 몸통과 충돌했을 때
    this.wormBody.forEach((item) => {
      // 아래 충돌은 Tile.js의 함수
      if (wormHead.collisionCheck(item)) {
        // 머리가 몸통과 충돌하면 true
        collisionBody = true;
      }
    });

    // 둘 중 하나라도 충돌(true)되면 게임오버
    return collisionEdge || collisionBody;
  }

  moveWorm() {
    // 현재 지렁이의 머리
    const head = this.wormBody[0];

    // 이동에 따른 지렁이의 새로운 머리
    let newHead;

    // 현재 지렁이의 방향을 다음 방향으로 바꿔주는 역할
    this.dir = this.dirNext;
    // console.log(this.dir);

    // 이동 방향에 따른 머리 렌더링 위치 설정
    if (this.dir === "ArrowRight") {
      // 현재 머리의 위치를 기반해서 새로운 머리를 만듦
      // 좌표이동
      newHead = new Tile(head.col + 1, head.row);
    } else if (this.dir === "ArrowDown") {
      newHead = new Tile(head.col, head.row + 1);
    } else if (this.dir === "ArrowLeft") {
      newHead = new Tile(head.col - 1, head.row);
    } else if (this.dir === "ArrowUp") {
      newHead = new Tile(head.col, head.row - 1);
    }

    // 머리와 테두리 혹은 몸통이 부딪히면 게임 오버됨
    if (this.collisionCheck(newHead)) {
      renderGameOver();
    }

    this.wormBody.unshift(newHead);

    // 지렁이가 피자를 먹었다면(충돌했다면)
    if (newHead.collisionCheck(pizza.pos)) {
      // 지렁이가 먹으면 커지고 피자가 사라짐
      // 피자가 있는 ctxBg를 지움
      ctxBg.clearRect(0, 0, cWidth, cHeight);
      pizza.movePizza();
    } else {
      // 지렁이가 안먹었으면 짧아짐
      this.wormBody.pop();
    }
  }

  // 사용자 입력한 방향키를 체크해서 지렁이의 다음 이동 방향을 결정함.
  checkDirection(dirKey) {
    // 지렁이가 자신의 몸에 부딪히지 않게 해야함
    if (this.dir === "ArrowRight" && dirKey === "ArrowLeft") {
      return;
    } else if (this.dir === "ArrowDown" && dirKey === "ArrowUp") {
      return;
    } else if (this.dir === "ArrowLeft" && dirKey === "ArrowRight") {
      return;
    } else if (this.dir === "ArrowUp" && dirKey === "ArrowDown") {
      return;
    }
    this.dirNext = dirKey;
  }
}
