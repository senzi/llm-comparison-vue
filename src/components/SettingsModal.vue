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
        <div class="fixed inset-0 bg-black/25" />
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
              <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900 border-b pb-4 mb-6">
                API 设置
              </DialogTitle>

              <!-- DeepSeek API 设置 -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 class="text-base font-semibold text-indigo-600 mb-3">DeepSeek API</h4>
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <div class="relative">
                    <input
                      type="password"
                      v-model="settings.deepseekApiKey"
                      placeholder="在此输入 DeepSeek API Key..."
                      class="mt-1 block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-200"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mt-1">
                      <KeyIcon class="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Moonshot API 设置 -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 class="text-base font-semibold text-indigo-600 mb-3">Moonshot API</h4>
                <div class="relative">
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <div class="relative">
                    <input
                      type="password"
                      v-model="settings.moonshotApiKey"
                      placeholder="在此输入 Moonshot API Key..."
                      class="mt-1 block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-200"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mt-1">
                      <KeyIcon class="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors duration-200"
                  @click="saveSettings"
                >
                  保存
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors duration-200"
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
import { KeyIcon } from '@heroicons/vue/24/outline'

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
