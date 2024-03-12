import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

export class FileStorage {
  constructor(readonly rootDir: string) {
    fse.ensureDirSync(rootDir);
  }

  public get = (key: string) => {
    const filePath = this.mergeKey(key);
    fse.ensureFileSync(filePath);
    const content = fs.readFileSync(filePath).toString();
    return content;
  };

  public set = (key: string, value: string) => {
    const filePath = this.mergeKey(key);
    fse.ensureFileSync(filePath);
    fs.writeFileSync(filePath, value);
  };

  public remove = (key: string) => {
    fs.rmSync(this.mergeKey(key));
  };

  private readonly mergeKey = (key: string) => {
    return path.join(this.rootDir, key);
  };
}

export class JsonStorage<T = any> {
  fileStorage: FileStorage;
  constructor(
    readonly rootDir: string,
    readonly fileName: string,
    defaultValue?: Partial<T>,
  ) {
    this.fileStorage = new FileStorage(rootDir);
    if (defaultValue) {
      if (!this.fileStorage.get(fileName)) {
        this.fileStorage.set(fileName, JSON.stringify(defaultValue));
      }
    }
  }

  get = () => {
    const content = this.fileStorage.get(this.fileName);
    const result = isJson(content);
    if (result) {
      return result as T;
    }
  };

  set = (value: T) => {
    this.fileStorage.set(this.fileName, JSON.stringify(value));
  };

  updateKey = (key: keyof T, value: NonNullable<T>[keyof T]) => {
    const old = this.get();

    if (old) {
      old[key] = value;
      this.set(old);
    }
  };

  remove = () => {
    this.fileStorage.remove(this.fileName);
  };
}

function isJson(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}
