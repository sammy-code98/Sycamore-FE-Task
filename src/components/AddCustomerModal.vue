<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { statesInNigeria } from "../lib/staticData";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "vee-validate";
import DialogClose from "./ui/dialog/DialogClose.vue";
import { addCustomerSchema } from "../schema/addCustomer.schema";
import { useCustomerStore } from "../store/useCustomerStore";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { toast } from "@/components/ui/toast";

const dialogOpen = ref(false);
const loading = ref(false);

const customerStore = useCustomerStore();

const { handleSubmit, resetForm } = useForm({
  validationSchema: addCustomerSchema,
});

const onSubmit = handleSubmit(
  (values) => {
    loading.value = true;
    const customerFormData = { id: uuidv4(), ...values };
    console.log("Form submitted with values:", values);

    setTimeout(() => {
      customerStore.addCustomer(customerFormData);
      toast({ description: "Customer added Successfully" });
      loading.value = false;
      resetForm();
      dialogOpen.value = false;
    }, 5000);
  },
  (errors) => {
    toast({
      description: "An Error occured adding a new customer",
      variant: "destructive",
    });
    console.error("Validation errors:", errors);
  }
);
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button class="bg-sycamore-primary text-white font-medium">
        Add a Customer
      </Button>
    </DialogTrigger>
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle class="text-sycamore-secondary"
          >Add a Customer</DialogTitle
        >
        <DialogDescription>
          Fill in the details below to add a new customer.
        </DialogDescription>
      </DialogHeader>

      <form class="py-4 space-y-4" @submit.prevent="onSubmit">
        <div class="flex justify-between items-center">
          <FormField name="firstName" v-slot="{ componentField }">
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="First Name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="lastName" v-slot="{ componentField }">
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Last Name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormControl>
              <Input type="email" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="phoneNumber" v-slot="{ componentField }">
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="Phone Number"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="state" v-slot="{ componentField }">
          <FormItem>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="state in statesInNigeria"
                      :key="state"
                      :value="state"
                      >{{ state }}</SelectItem
                    >
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="details" v-slot="{ componentField }">
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Customer Details"
                class="resize-none"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          name="isActive"
          v-slot="{ value, componentField, handleChange }"
        >
          <FormItem class="flex items-center gap-x-3">
            <FormControl>
              <Checkbox
                id="status"
                v-bind="componentField"
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
            <div class="grid gap-1.5 leading-none">
              <label
                for="status"
                class="text-sm font-medium text-sycamore-secondary"
              >
                Customer Status
              </label>
              <p class="text-sm text-muted-foreground">
                By checking this box, you agree that
                <span class="font-medium text-sycamore-primary">
                  this customer is Active
                </span>
              </p>
            </div>
          </FormItem>
        </FormField>

        <DialogFooter class="pt-6">
          <DialogClose as-child>
            <Button class="bg-sycamore-danger text-white px-12 font-medium">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            :disabled="loading"
            class="bg-sycamore-primary text-white font-medium flex items-center gap-2"
          >
            <template v-if="loading">
              <span class="loader" /> Submitting...
            </template>
            <template v-else> Add Customer </template>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
