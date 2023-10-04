// class extends 복사
class User4 {
  x = 10;
}

// User4 클래스를 복사
class NewUser extends User4 {}
let 사람임 = new NewUser();
console.log(사람임); // {x:10}

// private, protected class 안에서만 사용가능
class User5 {
  protected x = 10;
}

class NewUser2 extends User5 {
  // protected 라면 class 안에서 extends된 class 안에서도 사용가능
  doThis() {
    this.x = 20;
  }
}
// protected는 extends된 class는 사용가능,
let 사람임2 = new NewUser2();
// private와 마찬가지로 자식들은 사용불가능
사람임2.x;

class User6 {
  // static 키워드는 부모 class에 직접 부여되고 자식에겐 물려주지 않음(extends 는 잘따라온다)
  static x = 10;
  y = 20;
}
let 자식2 = new User6();
// static 자식은 사용 불가능
console.log(자식2.x);
// 부모는 사용 가능
console.log(User6.x); // 10

class User7 {
  // public / protected / private + static 붙일 수 있음
  public static x = 10;
}

class User8 {
  // construct보다 간편하게 사용
  // skill = "js"; // 이것을 못물려 받게 하고 싶을때 (this.skill 하지 않고)
  // 자식에게 skill 물려주지 않음
  static skill = "js"; // static을 사용할려면 무조건 부모로 사용
  intro = User8.skill + "전문가";
}

let 철2수 = new User8();
console.log(철2수);

// static으로 만든 변수 변경가능
User8.skill = "ts";
let 철3수 = new User8();
console.log(철3수);

// 해보기
class User9 {
  private static x = 10;
  public static y = 20;
  protected z = 30;
}
// 위 코드 해설
// 1. class 필드값은 원래 모든 User9의 자식들에게 물려주는 속성이지만, x와 y에는 static 키워드가 붙었기 때문에,
// 자식에서 사용이 불가하여 부모에서 접근 가능(User9.x)
// 2. private static x는 private로 인해 class 내부에서만 수정 가능 (자식들이 수정불가 하고 class 내부의 함수를 이용하는 방법)
// 3. public static y는 public로 인해 class 내부 외부 상관없이 수정가능 (public이 기본속성이라 없어도 똑같이 동작함)
// 4. protected z는 private와 유사하게 class 내부에서만 사용 가능하지만 약간 범위가 넓어서 extends로 복사한 class 내부에서도 사용할 수 있음

class User10 {
  private static x = 10;
  public static y = 20;

  addOne(a: number): void {
    // static이기 때문에 this를 사용하지 않아도 됨
    User10.x += a;
    console.log(User10.x);
  }
}
const newUser10 = new User10();

newUser10.addOne(3); // 13
newUser10.addOne(4); // 17

class Square2 {
  constructor(
    public width: number,
    public height: number,
    public color: string
  ) {}
  draw() {
    let a = Math.random();
    let square = `<div style="position:relative;
    top:${a * 400}px;
    left:${a * 400}px;
    width:${this.width}px;
    height:${this.height}px;
    background:${this.color}"></div>`;
    document.body.insertAdjacentHTML("beforeend", square);
  }
}

let 네모2 = new Square2(30, 30, "red");
네모2.draw();
네모2.draw();
네모2.draw();
네모2.draw();
