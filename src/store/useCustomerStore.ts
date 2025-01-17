import { defineStore } from "pinia";

interface customerDataProp {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  state: string;
  isActive: boolean;
  details: string;
}

export const useCustomerStore = defineStore("customerStore", {
  state: () => ({
    customers: [] as customerDataProp[],
  }),
  actions: {
    addCustomer(customer: customerDataProp) {
      this.customers.push(customer);
    },
  },
  persist: true,
});
