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
