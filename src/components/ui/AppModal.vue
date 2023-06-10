<script setup>
import { useEmployeeForm } from '../../use/employee-form';

const emit = defineEmits(['close', 'submit']);

const props = defineProps({
  initialValues: {
    type: Object,
    default() {
      return {};
    },
  },
});

const {
  name,
  nErrorMessage,
  lastName,
  lnErrorMessage,
  experience,
  expErrorMessage,
  oneSubmit,
  age,
  ageErrorMessage,
  address,
  addrErrorMessage,
} = useEmployeeForm(props.initialValues, emit);
</script>

<template>
  <div class="container" style="width: 800px">
    <div class="row">
      <div class="col-md-6 shadow mx-auto p-4 bg-white">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <h3 class="text-center mb-3">{{ initialValues?.name || 'Добавить сотрудника' }}</h3>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <form @submit.prevent="oneSubmit">
          <div class="form-group mb-2">
            <label class="p-1">Имя</label>
            <input
              type="text"
              v-model="name"
              placeholder="Например, Иван"
              :class="['form-control', { 'form-control-error': nErrorMessage }]"
            />
            <span v-if="nErrorMessage" class="error-message">{{ nErrorMessage }}</span>
          </div>
          <div class="form-group mb-2">
            <label class="p-1">Фамилия</label>
            <input
              type="text"
              v-model="lastName"
              placeholder="Иванов"
              :class="['form-control', { 'form-control-error': lnErrorMessage }]"
            />
            <span v-if="lnErrorMessage" class="error-message">{{ lnErrorMessage }}</span>
          </div>
          <div class="form-group mb-2">
            <label class="p-1">Стаж</label>
            <input
              type="text"
              v-model="experience"
              placeholder="Стаж работы"
              :class="['form-control', { 'form-control-error': expErrorMessage }]"
            />
            <span v-if="expErrorMessage" class="error-message">{{ expErrorMessage }}</span>
          </div>
          <div class="form-group mb-2">
            <label class="p-1">Возраст</label>
            <input
              type="number"
              v-model="age"
              placeholder="Возраст"
              :class="['form-control', { 'form-control-error': ageErrorMessage }]"
            />
            <span v-if="ageErrorMessage" class="error-message">{{ ageErrorMessage }}</span>
          </div>
          <div class="form-group mb-2">
            <label class="p-1">Адрес</label>
            <input
              type="text"
              v-model="address"
              placeholder="Адрес"
              :class="['form-control', { 'form-control-error': addrErrorMessage }]"
            />
            <span v-if="addrErrorMessage" class="error-message">{{ addrErrorMessage }}</span>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-dark m-1">
              {{ initialValues ? 'Сохранить' : 'Добавить' }}
            </button>
            <button type="button" class="btn btn-danger" @click="$emit('close')">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control-error {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 12px;
}
</style>
