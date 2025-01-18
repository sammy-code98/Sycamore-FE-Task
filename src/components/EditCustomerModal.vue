<script setup lang="ts">
import { ref, computed } from "vue";
import { useCustomerStore } from "../store/useCustomerStore";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const customerStore = useCustomerStore();
const isEditEnabled = ref(false);
const customerToEdit = ref<any>(null);

const isDialogOpen = ref(false);

// const openDialog = (id: string) => {
//   const customer = customerStore.customers.find((cust) => cust.id === id);
//   if (customer) {
//     customerToEdit.value = { ...customer };
//     isEditEnabled.value = false; // Disable inputs initially
//     isDialogOpen.value = true;
//   }
// };
const openDialog = (id: string) => {
  const customer = customerStore.customers.find((cust) => cust.id === id);
  if (customer) {
    customerToEdit.value = { ...customer };
    isDialogOpen.value = true; // Open the dialog
  }
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

// const closeDialog = () => {
//   isDialogOpen.value = false;
// };

// const toggleEdit = () => {
//   if (isEditEnabled.value) {
//     // If already editing, update the customer
//     customerStore.updateCustomer(customerToEdit.value);
//     closeDialog();
//   }
//   isEditEnabled.value = true; // Enable inputs
// };
const toggleEdit = () => {
  if (isEditEnabled.value) {
    // If already editing, update the customer
    customerStore.updateCustomer(customerToEdit.value);
    closeDialog();
  }
  isEditEnabled.value = true; // Enable inputs
};

defineExpose({ openDialog });

</script>

<template>
  <Dialog v-model="isDialogOpen">
    <!-- <DialogOverlay /> -->
    <DialogContent>
      <h3 class="text-lg font-medium">Edit Customer</h3>
      <div class="space-y-4 mt-4">
        <Input
          id="firstName"
          type="text"
          placeholder="First Name"
          v-model="customerToEdit.firstName"
          :disabled="!isEditEnabled"
        />
        <Input
          id="lastName"
          type="text"
          placeholder="Last Name"
          v-model="customerToEdit.lastName"
          :disabled="!isEditEnabled"
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          v-model="customerToEdit.email"
          :disabled="!isEditEnabled"
        />
        <Input
          id="phoneNumber"
          type="text"
          placeholder="Phone Number"
          v-model="customerToEdit.phoneNumber"
          :disabled="!isEditEnabled"
        />
        <Input
          id="state"
          type="text"
          placeholder="State"
          v-model="customerToEdit.state"
          :disabled="!isEditEnabled"
        />
      </div>
      <DialogFooter>
        <Button @click="toggleEdit">
          {{ isEditEnabled ? "Update" : "Edit" }}
        </Button>
        <Button variant="outline" @click="closeDialog">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
