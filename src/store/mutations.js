export default {
  cityChange (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) { }
  }
}
