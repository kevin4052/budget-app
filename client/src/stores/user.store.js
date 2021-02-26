export function createStore() {
  return {
    user: null,
    addUser(data) {
      this.user = data;
    },
    removeUser() {
      this.user = null;
    },
  };
}
