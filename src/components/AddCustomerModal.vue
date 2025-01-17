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
import { addCustomerSchema } from "../schema/addCustomer.scheama";
import DialogClose from "./ui/dialog/DialogClose.vue";

const { handleSubmit, resetForm } = useForm({
  validationSchema: addCustomerSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(JSON.stringify(values));
  resetForm();
});
</script>

<template>
  <Dialog>
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

      <form class="py-4 space-y-4"  @submit.prevent="onSubmit">
        <div class="flex justify-between items-center gap-4">
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

        <FormField name="isActive" v-slot="{ componentField }">
          <FormItem class="flex items-center gap-x-3">
            <FormControl>
              <Checkbox id="status" v-bind="componentField" />
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

        <DialogFooter  class="pt-6">
          <DialogClose as-child>
            <Button class="bg-sycamore-danger text-white px-12 font-medium">
              Cancel
            </Button>
          </DialogClose>
          
          <Button
            type="submit"
            class="bg-sycamore-primary text-white font-medium"
          >
            Add Customer
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
