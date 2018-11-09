export class Maybe<T> {
  value?: T;

  private constructor(value?: T) {
    this.value = value;
  }

  static some<T>(value: T) {
    if (!value) {
      new Error("You must provide a value");
    }
    return new Maybe(value);
  }

  static none<T>() {
    return new Maybe<T>();
  }

  map<R>(f: (a: T) => R): Maybe<R> {
    if (this.value == null) {
      return Maybe.none<R>();
    }
    return Maybe.some<R>(f(this.value));
  }
}
