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
      <div class="py-4 space-y-4">
        <div class="flex justify-between items-center gap-4">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
        </div>
        <Input type="email" placeholder="Email" />
        <Input type="text" placeholder="Phone Number" />

        <Select>
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

        <Textarea placeholder="Customer Details" class="resize-none" />

        <div class="items-top flex gap-x-2">
          <Checkbox id="status" />
          <div class="grid gap-1.5 leading-none">
            <label
              for="status"
              class="text-sm font-medium text-sycamore-secondary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Customer Status
            </label>
            <p class="text-sm text-muted-foreground">
              By checking this box, you agree that
              <span class="font-medium text-sycamore-primary"
                >this customer is Active</span
              >
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button class="bg-sycamore-danger text-white px-12 font-medium">
          Cancel
        </Button>
        <Button
          type="submit"
          class="bg-sycamore-primary text-white font-medium"
        >
          Add Customer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
