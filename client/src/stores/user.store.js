// import React from "react";
// // import { makeAutoObservable } from "mobx";
// import { useLocalStore } from "mobx-react";

// const StoreContext = React.createContext();

// const StoreProvider = ({ children }) => {
//   const store = useLocalStore(() => ({
//     users: ["kevin", "Liz"],
//     user: null,
//   }));

//   return (
//     <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
//   );
// };

// export default StoreProvider;

import { makeAutoObservable, autorun, runInAction } from "mobx";

class UserStore {
  constructor() {
    makeAutoObservable(this);
    this.users = ["kevin", "Liz"];
  };
};

export default new UserStore();
