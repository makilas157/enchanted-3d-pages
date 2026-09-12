import * as THREE from "three";

/**
 * The dev tooling injects `data-*` attributes onto every JSX element, including
 * three.js elements. react-three-fiber treats dashes as nested property paths,
 * so `data-tsd-source` resolves to `object.data.tsd.source` and throws.
 *
 * Giving three objects a lazily-created plain `data` bag makes those writes
 * harmless no-ops instead of runtime errors.
 */
const prototypes = [
  THREE.Object3D.prototype,
  THREE.Material.prototype,
  THREE.BufferGeometry.prototype,
] as unknown as Array<Record<string, unknown>>;

for (const proto of prototypes) {
  if (Object.getOwnPropertyDescriptor(proto, "data")) continue;
  const store = new WeakMap<object, Record<string, unknown>>();
  Object.defineProperty(proto, "data", {
    configurable: true,
    get(this: object) {
      let bag = store.get(this);
      if (!bag) {
        bag = { tsd: {} };
        store.set(this, bag);
      }
      return bag;
    },
    set(this: object, value: Record<string, unknown>) {
      store.set(this, value ?? { tsd: {} });
    },
  });
}

export {};
