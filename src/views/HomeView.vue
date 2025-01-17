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

type customerDataProp = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  state: string;
  status: boolean;
  details: string;
};

const customerData: customerDataProp[] = [
  {
    id: "2der344",
    firstname: "Samuel",
    lastname: "Uzor",
    email: "ugosammy98@gmail.com",
    phone: "08163171496",
    state: "Ebonyi",
    status: true,
    details: "Frontend Engineer",
  },
];
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl text-sycamore-secondary font-bold">Customers</h1>

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
          <TableRow v-for="customer in customerData" :key="customer.id">
            <TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.firstname }}
            </TableCell>
            <TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.lastname }} </TableCell
            ><TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.email }} </TableCell
            ><TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.phone }} </TableCell
            ><TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.state }} </TableCell
            ><TableCell class="font-medium text-xs">
              <span
                class="rounded-full text-white px-4 py-1"
                :class="[
                  customer.status === true
                    ? 'bg-sycamore-primary'
                    : 'bg-sycamore-secondary',
                ]"
              >
                {{ customer.status === true ? 'Active' :'Not Active' }}
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
