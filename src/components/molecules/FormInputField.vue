<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    inputClass: {
      type: String,
      default: ''
    },
    isWidthFull: {
      type: Boolean,
      default: true
    },
    labelText: {
      type: String,
      required: false,
      default: ''
    },
    errorText: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    },
    helperTexts: {
      type: Array,
      default: () => []
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    textAreaRows: {
      type: Number,
      default: 3
    },
    isDisplayTextCounter: {
      type: Boolean,
      default: false
    },
    maxTextCount: {
      type: Number
    },
    modelValue: String
  },

  setup(props, context) {
    const inputValue = ref(props.modelValue)

    const inputClassStr = computed(() => {
      let classes = props.inputClass ? props.inputClass.split(' ') : []
      if (props.isWidthFull) {
        classes.push('w-full')
      }
      if (props.errorText) {
        classes = classes.concat([
          'bg-red-50',
          'border-red-500',
          'text-red-900',
          'placeholder-red-700',
          'focus:ring-red-500',
          'focus:border-red-500',
          'dark:text-red-500',
          'dark:placeholder-red-500',
          'dark:border-red-500'
        ])
      } else {
        classes = classes.concat(['border-gray-300'])
      }
      return classes.join(' ')
    })

    const textCount = computed(() => {
      if (inputValue.value == null) {
        return 0
      }
      return inputValue.value.length
    })

    watch(
      () => props.modelValue,
      (value) => {
        inputValue.value = value
      }
    )

    watch(inputValue, (value) => {
      context.emit('update:modelValue', value)
    })

    return {
      inputValue,
      inputClassStr,
      textCount
    }
  }
})
</script>

<template>
  <div>
    <label
      v-if="labelText"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      :class="{ 'text-red-600': errorText, 'dark:text-red-500': errorText }"
    >
      <span>{{ labelText }}</span>
      <span
        v-if="isRequired"
        class="text-red-700 text-xs ml-2"
      >
        {{ $t('form.required') }}
      </span>
    </label>
    <textarea
      v-if="inputType === 'textarea'"
      v-model="inputValue"
      :type="inputType"
      @blur="$emit('blur', inputValue)"
      :rows="textAreaRows"
      class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="{
        'border-gray-300': !errorText,
        'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500':
          errorText || (isDisplayTextCounter && maxTextCount && textCount > maxTextCount)
      }"
    ></textarea>

    <input
      v-else
      v-model="inputValue"
      @blur="$emit('blur', inputValue)"
      type="text"
      class="bg-gray-50 border text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="inputClassStr"
    />
    <div
      v-if="isDisplayTextCounter"
      class="pt-1"
    >
      <span
        v-if="maxTextCount"
        class="flex justify-end gap-x-1 text-xs text-gray-500 dark:text-gray-400"
      >
        <span>{{ textCount }}</span>
        <span>/</span>
        <span>{{ maxTextCount }}</span>
      </span>
      <span v-else>
        <span>{{ textCount }}</span>
      </span>
    </div>
    <p
      v-if="errorText"
      class="text-sm text-red-600 dark:text-red-500"
      :class="{ 'mt-2': !isDisplayTextCounter }"
    >
      {{ errorText }}
    </p>
    <p
      v-if="helperText"
      class="mt-2 text-xs text-gray-500 dark:text-gray-400"
    >
      {{ helperText }}
    </p>
    <div
      v-if="helperTexts"
      class="mt-2 text-xs text-gray-500 dark:text-gray-400"
    >
      <div
        v-for="(helperText, index) in helperTexts"
        :key="index"
        :class="{ 'mt-2': index > 0 }"
      >
        {{ helperText }}
      </div>
    </div>
  </div>
</template>
