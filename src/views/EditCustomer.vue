<!-- <script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomerStore } from "../store/useCustomerStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();

// Reactive references for the customer data
const customerToEdit = ref<any>(null);
const isEditEnabled = ref(false);

// Fetch customer details based on the route param 'id'
onMounted(() => {
  const customerId = route.params.id as string;
  const customer = customerStore.customers.find(cust => cust.id === customerId);
  console.log(customer, 'lo');
  
  if (customer) {
    customerToEdit.value = { ...customer };
    isEditEnabled.value = false; // Initially disable inputs
  } else {
    // Handle case where customer not found - redirect or show error
    router.push('/error'); // Example error route
  }
});

// Update customer when form submitted
const updateCustomer = () => {
  if (customerToEdit.value) {
    customerStore.updateCustomer(customerToEdit.value);
    router.push('/'); // Navigate back to customer list or wherever appropriate
  }
};

// Cancel editing and navigate back
const cancelEdit = () => {
  router.back();
};

</script>

<template>
  <div class="p-6">
    <h3 class="text-lg font-medium mb-4">Edit Customer</h3>
    <form @submit.prevent="updateCustomer" class="space-y-4">
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
      <div class="mt-4">
        <Button @click="isEditEnabled = !isEditEnabled">
          {{ isEditEnabled ? "Update" : "Edit" }}
        </Button>
        <Button variant="outline" @click.prevent="cancelEdit">Cancel</Button>
      </div>
    </form>
  </div>
</template> -->

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomerStore } from "../store/useCustomerStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { statesInNigeria } from "../lib/staticData";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();

// Reactive references for the customer data and loading state
const customerToEdit = ref<any | null>(null);
const isEditEnabled = ref(false);
const isLoading = ref(true); // Loading state to show until data is fetched
const isError = ref(false); // Error state for handling customer not found

// Fetch customer details based on the route param 'id'
onMounted(async () => {
  const customerId = route.params.id as string;
  const customer = customerStore.customers.find(
    (cust) => cust.id === customerId
  );

  if (customer) {
    customerToEdit.value = { ...customer };
    isEditEnabled.value = false; // Initially disable inputs
    isLoading.value = false; // Set loading to false when data is fetched
  } else {
    isLoading.value = false; // Stop loading
    isError.value = true; // Set error state when customer not found
  }
});

// Update customer when form is submitted
const updateCustomer = () => {
  if (customerToEdit.value) {
    customerStore.updateCustomer(customerToEdit.value);
    // router.push('/'); // Navigate back to customer list or wherever appropriate
  }
};

// Cancel editing and navigate back
const cancelEdit = () => {
  router.back();
};
</script>

<template>
  <div class="p-6">
    <h3 class="text-xl font-semibold mb-4 text-sycamore-secondary">Edit Customer</h3>

    <!-- Show loading state -->
    <div v-if="isLoading" class="text-center">Loading...</div>

    <!-- Show error state -->
    <div v-if="isError" class="text-red-500 text-center">
      Customer not found. Please try again.
    </div>

    <!-- Show form when customer data is fetched -->
    <form
      v-if="!isLoading && !isError"
      @submit.prevent="updateCustomer"
      class="space-y-4"
    >
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

      <Select
        id="state"
        :disabled="!isEditEnabled"
        v-model="customerToEdit.state"
      >
        <SelectTrigger>
          <SelectValue
            :placeholder="customerToEdit.state || 'Select a state'"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="state in statesInNigeria"
              :key="state"
              :value="state"
            >
              {{ state }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Textarea
  :placeholder="customerToEdit.details ||'Customer Details'"
  class="resize-none"
  v-model="customerToEdit.details"
  :disabled="!isEditEnabled"
/>

<div class="flex items-center gap-x-3">
  <Checkbox 
    id="status"
    v-model="customerToEdit.isActive"
    :disabled="!isEditEnabled"
    :checked="customerToEdit.isActive"
    @update:checked="customerToEdit.isActive"
  />
<div class="grid gap-1.5 leading-none">
  <label
    for="status"
    class="text-sm font-medium text-sycamore-secondary"
  >
    Customer Status
  </label>
  <p class="text-sm text-muted-foreground">
   Update customer status
  </p>
</div>
</div>

      <div class="py-4 flex justify-end gap-5">
        <!-- <Button @click="isEditEnabled = !isEditEnabled">
          {{ isEditEnabled ? "Update" : "Edit" }}
        </Button> -->
        <!-- <Button @click="isEditEnabled = !isEditEnabled">
          {{ isEditEnabled ? "Update" : "Edit" }}
        </Button> -->
        <Button class="px-8 py-4 text-sycamore-danger font-medium" variant="outline" @click.prevent="cancelEdit">Cancel</Button>

        <Button class="px-8 py-4  text-white font-medium"
          @click="isEditEnabled ? updateCustomer() : (isEditEnabled = true)"
        >
          {{ isEditEnabled ? "Update" : "Edit" }}
        </Button>
      </div>
    </form>
  </div>
</template>
