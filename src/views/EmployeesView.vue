<script setup>
import { ref, watch, onMounted } from 'vue';
import EmployeeItem from '../components/EmployeeItem.vue';
import AppModal from '../components/ui/AppModal.vue';

const showModal = ref(false);
const allEmployees = ref([]);
const existEmployee = ref(null);

const closeModal = () => {
  showModal.value = false;
  existEmployee.value = null;
};

// Событие отправки данных и заносим их в Массив
const submitHandler = (value) => {
  if (value?.id) {
    // Редактируем cотрудника
    let selectedIndex = allEmployees.value.findIndex((employee) => employee.id === value.id);
    allEmployees.value[selectedIndex] = value;
  } else {
    // Создаем нового cотрудника
    allEmployees.value.push({ ...value, id: Date.now().toString() });
  }

  closeModal();
};

// Открываем модальное окно с формой для редактирования данных сотрудника
const openEditEmployee = (id) => {
  existEmployee.value = allEmployees.value.find((employee) => employee.id === id);

  showModal.value = true;
};

// Сохраняем данные в LocalStorage
watch(
  allEmployees,
  (newVal) => {
    localStorage.setItem('allEmployees', JSON.stringify(newVal));
  },
  { deep: true },
);

// Получаем данные из LocalStorage
onMounted(() => {
  allEmployees.value = JSON.parse(localStorage.getItem('allEmployees')) || [];
});
</script>

<template>
  <div class="container py-3">
    <h1 class="text-center mb-5">Сотрудники</h1>
    <button @click="showModal = true" type="button" class="btn btn-success mb-3">
      + Добавить сотрудника
    </button>

    <Teleport to="body">
      <div class="modal-bg" v-if="showModal">
        <AppModal :initial-values="existEmployee" @close="closeModal" @submit="submitHandler" />
      </div>
    </Teleport>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Стаж</th>
            <th scope="col">Возраст</th>
            <th scope="col">Адрес</th>
            <th scope="col" style="width: 10px"></th>
          </tr>
        </thead>

        <tbody>
          <EmployeeItem
            v-for="(employee, index) in allEmployees"
            :key="employee.id"
            @edit="openEditEmployee"
            :employee="employee"
            :index="index"
          />
        </tbody>
      </table>
      <div v-if="allEmployees.length === 0" class="text-center">Нет сотрудников</div>
    </div>
  </div>
</template>

<style>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
