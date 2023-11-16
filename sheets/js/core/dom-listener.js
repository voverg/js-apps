export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root for DomListener`);
    }

    this.$root = $root;
  }
}