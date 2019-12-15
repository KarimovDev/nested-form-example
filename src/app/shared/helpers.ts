export const calculateAge = birthday => {
  if (birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  } else {
    return 0;
  }
};

export const maskCallback = (fieldName: string, maskName: string) => {
  return value => {
    const maskedValue = this[maskName].transform(value);
    if (value !== maskedValue) {
      const valueObject = {};
      valueObject[fieldName] = maskedValue;

      this.form.patchValue(valueObject);
    }
  };
};
