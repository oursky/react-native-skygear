type MaybeType = "None" | "Just";

export class Maybe<T> {
  private value?: T;
  private type: MaybeType;

  private constructor(value?: T) {
    this.value = value;
    this.type = value == null ? "None" : "Just";
  }

  static just<T>(value: T) {
    if (!value) {
      new Error("You must provide a value");
    }
    return new Maybe(value);
  }

  static isJust<T>(t: Maybe<T>) {
    return t.type == "Just";
  }

  static none<T>() {
    return new Maybe<T>();
  }

  static isNone<T>(t: Maybe<T>) {
    return t.type == "None";
  }

  map<R>(f: (a: T) => R): Maybe<R> {
    if (this.value == null) {
      return Maybe.none<R>();
    }
    return Maybe.just<R>(f(this.value));
  }

  getValue() {
    return this.value;
  }
}
