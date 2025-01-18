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
import { EllipsisVertical, PenLine, Search, Trash2 } from "lucide-vue-next";
import AddCustomerModal from "@/components/AddCustomerModal.vue";
import { useCustomerStore } from "../store/useCustomerStore";
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref("");

const openEditPage = (id: string) => {
  router.push({ name: 'EditCustomer', params: { id } });
};


const customerStore = useCustomerStore();

const customers = computed(() => customerStore.customers);
const currentPage = ref(1);
const itemsPerPage = 5;

// stats
const totalCustomers = computed(() => customers.value.length);
const totalActiveCustomers = computed(
  () => customers.value.filter((customer) => customer.isActive).length
);
const totalInActiveCustomers = computed(
  () => totalCustomers.value - totalActiveCustomers.value
);

// search filter method
const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return customers.value;
  return customers.value.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(query) ||
      customer.lastName.toLowerCase().includes(query) ||
      fullName.includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phoneNumber.includes(query) ||
      customer.state.toLowerCase().includes(query) ||
      (customer.isActive ? "active" : "inactive").includes(query)
    );
  });
});

// Paginated customers based on the current page
const paginatedCustomers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredCustomers.value.slice(startIndex, startIndex + itemsPerPage);
});

// Total pages for pagination
const totalPages = computed(() =>
  Math.ceil(filteredCustomers.value.length / itemsPerPage)
);

// Change page handler
const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl text-sycamore-secondary font-bold">
      Customer Overview
    </h1>

    <div class="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 border border-slate-200 rounded-xl shadow-sm space-y-3">
        <h3 class="text-lg font-medium text-sycamore-secondary">
          Total Customers
        </h3>
        <h4 class="text-3xl font-bold text-sycamore-secondary">
          {{ totalCustomers }}
        </h4>
      </div>
      <div class="p-4 border border-slate-200 rounded-xl shadow-sm space-y-3">
        <h3 class="text-lg font-medium text-sycamore-secondary">
          Active Customers
        </h3>
        <h4 class="text-3xl font-bold text-sycamore-secondary">
          {{ totalActiveCustomers }}
        </h4>
      </div>
      <div class="p-4 border border-slate-200 rounded-xl shadow-sm space-y-3">
        <h3 class="text-lg font-medium text-sycamore-secondary">
          InActive Customers
        </h3>
        <h4 class="text-3xl font-bold text-sycamore-secondary">
          {{ totalInActiveCustomers }}
        </h4>
      </div>
    </div>

    <div class="flex justify-between items-center gap-4">
      <div class="relative w-full max-w-xl items-center">
        <Input
          id="search"
          type="text"
          placeholder="search by name, email,phone or state..."
          class="pl-10"
          v-model="searchQuery"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>

      <div>
        <AddCustomerModal />
      </div>
    </div>

    <!-- empty state  -->
    <div
      v-if="filteredCustomers.length === 0"
      class="py-6 flex flex-col justify-center items-center space-y-4"
    >
      <p class="text-sycamore-secondary text-lg font-medium">
        No customers found. Add a new customer to get started!
      </p>
      <div class="mt-4">
        <AddCustomerModal />
      </div>
    </div>

    <div v-else class="py-6">
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="customer in paginatedCustomers" :key="customer.id">
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
            ><TableCell class="font-semibold text-xs">
              <span
                class="rounded-full text-white px-4 py-1"
                :class="[
                  customer.isActive === true
                    ? 'bg-sycamore-primary'
                    : 'bg-sycamore-secondary',
                ]"
              >
                {{ customer.isActive === true ? "Active" : "InActive" }}
              </span>
            </TableCell>
            <TableCell class="font-medium text-xs text-sycamore-secondary">
              {{ customer.details }}
            </TableCell>
            <TableCell>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <EllipsisVertical class="h-4 w-4 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem class="text-sycamore-secondary cursor-pointer"  @click="openEditPage(customer.id)">
                      <PenLine class="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      class="text-sycamore-danger cursor-pointer"
                      color="danger"
                     @click="customerStore.deleteCustomer(customer.id)"

                    >
                      <Trash2 class="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div
        v-if="totalPages > 1"
        class="flex justify-end items-center gap-2 mt-4"
      >
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </Button>
        <span class="text-sm text-muted-foreground">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </Button>
      </div>
    </div>
  </div>

</template>
