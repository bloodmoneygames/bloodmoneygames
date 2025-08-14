class ClassName {
  base: string[];

  constructor(className: string[] | string) {
    if (!Array.isArray(className)) {
      className = [className]
    }

    this.base = className;
  }

  add(className: string[]) {
    this.base = [...this.base, ...className];

    return this;
  }

  addIf(
    className: string[] | string | undefined
  ) {
    if (!className) return this;

    if (!Array.isArray(className)) {
      className = [className]
    }

    this.add(className);

    return this;
  }

  toString() {
    return this.base.join(' ');
  }
}

export default ClassName;
