export function AutoUnsubscribe(blackList = []) {
  return constructor => {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function() {
      Object.keys(this).forEach(prop => {
        const property = this[prop];
        if (!blackList.includes(prop)) {
          if (property && typeof property.unsubscribe === 'function') {
            property.unsubscribe();
          }
        }
      });

      if (original && typeof original === 'function') {
        original.apply(this, arguments);
      }
    };
  };
}
