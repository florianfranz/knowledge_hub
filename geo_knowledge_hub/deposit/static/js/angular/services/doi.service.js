export default class DOIService {
  reserve() {
    return `reserved-${Date.now()}`
  }

  search(doi) {
    return null;
  }
}