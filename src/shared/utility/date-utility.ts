export class DateUtilities {
  static getExpiredColor(comparedDate) {
    if (Date.parse(comparedDate) < Date.parse(new Date().toDateString())) {
      return 'red';
    }
    return 'green';
  }
}
