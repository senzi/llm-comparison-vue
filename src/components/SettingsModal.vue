<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                API 设置
              </DialogTitle>

              <!-- DeepSeek API 设置 -->
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-700">DeepSeek API</h4>
                <div class="mt-2">
                  <label class="block text-sm font-medium text-gray-700">API Key</label>
                  <input
                    type="password"
                    v-model="settings.deepseekApiKey"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <!-- Moonshot API 设置 -->
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-700">Moonshot API</h4>
                <div class="mt-2">
                  <label class="block text-sm font-medium text-gray-700">API Key</label>
                  <input
                    type="password"
                    v-model="settings.moonshotApiKey"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  @click="saveSettings"
                >
                  保存
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  取消
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'save'])

const settings = ref({
  deepseekApiKey: localStorage.getItem('deepseekApiKey') || '',
  moonshotApiKey: localStorage.getItem('moonshotApiKey') || ''
})

const closeModal = () => {
  emit('close')
}

const saveSettings = () => {
  // 保存到 localStorage
  localStorage.setItem('deepseekApiKey', settings.value.deepseekApiKey)
  localStorage.setItem('moonshotApiKey', settings.value.moonshotApiKey)
  
  emit('save', {
    deepseekApiKey: settings.value.deepseekApiKey,
    moonshotApiKey: settings.value.moonshotApiKey
  })
  
  closeModal()
}
</script>
