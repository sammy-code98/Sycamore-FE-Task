<script setup lang="ts">
import { ref, onMounted } from "vue";
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

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();

const customerToEdit = ref<any | null>(null);
const isEditEnabled = ref(false);
const isLoading = ref(true);
const isError = ref(false);
const isUpdateLoading = ref(false);

onMounted(async () => {
  const customerId = route.params.id as string;
  const customer = customerStore.customers.find(
    (cust) => cust.id === customerId
  );

  if (customer) {
    customerToEdit.value = { ...customer };
    isEditEnabled.value = false;
    isLoading.value = false;
  } else {
    isLoading.value = false;
    isError.value = true;
  }
});

const updateCustomer = async () => {
  if (customerToEdit.value) {
    isUpdateLoading.value = true;

    setTimeout(() => {
      customerStore.updateCustomer(customerToEdit.value);
      isUpdateLoading.value = false;
      router.push("/");
    }, 5000);
  }
};

const cancelEdit = () => {
  router.back();
};
</script>

<template>

  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Customer Overview
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
     
        <BreadcrumbItem>
        <BreadcrumbPage>Edit Customer</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <div class="p-6">
    <h3 class="text-xl font-semibold mb-4 text-sycamore-secondary">
      Edit Customer
    </h3>

    <div v-if="isLoading" class="text-center text-sycamore-secondary text-base">
      Loading...
    </div>

    <div v-if="isError" class="text-red-500 text-center text-base">
      Customer not found. Please try again.
    </div>

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
        :placeholder="customerToEdit.details || 'Customer Details'"
        class="resize-none"
        v-model="customerToEdit.details"
        :disabled="!isEditEnabled"
      />

      <div class="flex items-center gap-x-3">
        <Checkbox
          id="status"
          v-model="customerToEdit.isActive"
          :disabled="!isEditEnabled"
        />
        <div class="grid gap-1.5 leading-none">
          <label
            for="status"
            class="text-sm font-medium text-sycamore-secondary"
          >
            Customer Status
          </label>
          <p class="text-sm text-muted-foreground">Update customer status</p>
        </div>
      </div>

      <div class="py-4 flex justify-end gap-5">
        <Button
          class="px-8 py-4 text-sycamore-danger font-medium"
          variant="outline"
          @click.prevent="cancelEdit"
        >
          Cancel
        </Button>
        <Button
          v-if="!isEditEnabled && !isUpdateLoading"
          class="px-8 py-4 text-white font-medium mr-4"
          :disabled="isEditEnabled || isUpdateLoading"
          @click="isEditEnabled = true"
        >
          Edit
        </Button>

        <Button
          v-else
          class="px-8 py-4 text-white font-medium"
          :disabled="!isEditEnabled || isUpdateLoading"
          @click="updateCustomer()"
        >
          <template v-if="isUpdateLoading">Updating...</template>
          <template v-else>Update</template>
        </Button>
      </div>
    </form>
  </div>
</template>
