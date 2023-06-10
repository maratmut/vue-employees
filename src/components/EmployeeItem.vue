<script setup>
const emit = defineEmits(['edit']);

const props = defineProps({
  employee: Object,
  index: Number,
  showModal: Boolean,
});
</script>
<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ employee.name }}</td>
    <td>{{ employee.lastName }}</td>
    <td>{{ employee.experience }}</td>
    <td>{{ employee.age }}</td>
    <td>{{ employee.address }}</td>
    <td>
      <button type="button" class="btn btn-primary" @click="$emit('edit', employee.id)">
        Редактировать
      </button>
    </td>
  </tr>
</template>

<style scoped></style>
