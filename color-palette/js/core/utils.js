function utils() {
  return {
    getId() {
      const randomNum = Math.floor(Math.random() * 1000);
      const id = Date.now() + randomNum;

      return id.toString();
    },

  }
}