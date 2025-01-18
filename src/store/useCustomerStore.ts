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
    deleteCustomer(customerId: string) {
      this.customers = this.customers.filter(
        (customer) => customer.id !== customerId
      );
    },
    updateCustomer(updatedCustomer: customerDataProp) {
      const index = this.customers.findIndex(
        (cust) => cust.id === updatedCustomer.id
      );
      if (index !== -1) {
        this.customers[index] = updatedCustomer;
      }
    },
  },
  persist: true,
});
