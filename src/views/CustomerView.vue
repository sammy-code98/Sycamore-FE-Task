<script setup lang="ts">
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-vue-next";
import AddCustomerModal from "@/components/AddCustomerModal.vue";
import { useCustomerStore } from "../store/useCustomerStore";
import { computed } from "vue";


const  customerStore = useCustomerStore()

const customers =  computed(() => customerStore.customers)
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl text-sycamore-secondary font-bold">Customer Overview</h1>

    <div class="flex justify-between items-center gap-4">
      <div class="relative w-full max-w-xl items-center">
        <Input
          id="search"
          type="text"
          placeholder="search by name, email,phone or state..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>

      <div>
          <AddCustomerModal/>
      </div>
    </div>

    <div class="py-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="customer in customers" :key="customer.id">
            <TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.firstName }}
            </TableCell>
            <TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.lastName }} </TableCell
            ><TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.email }} </TableCell
            ><TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.phoneNumber }} </TableCell
            ><TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.state }} </TableCell
            ><TableCell class="font-medium text-xs">
              <span
                class="rounded-full text-white px-4 py-1"
                :class="[
                  customer.isActive === true
                    ? 'bg-sycamore-primary'
                    : 'bg-sycamore-secondary',
                ]"
              >
                {{ customer.isActive === true ? 'Active' :'Not Active' }}
              </span>
            </TableCell>
            <TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.details }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
