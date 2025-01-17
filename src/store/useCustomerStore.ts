import { defineStore } from "pinia";

interface customerDataProp {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
