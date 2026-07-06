declare module "three/examples/jsm/loaders/OBJLoader" {
  import { Loader, Group } from "three";

  export class OBJLoader extends Loader {
    load(
      url: string,
      onLoad: (object: Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(data: string): Group;
  }
}
