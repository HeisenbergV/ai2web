import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Pinia Counter Store 示例
 * 演示 Pinia 的基本用法：状态、计算属性、方法
 */
export const useCounterStore = defineStore('counter', () => {
  // ========== State（状态） ==========
  const count = ref(0)
  const history = ref([]) // 操作历史记录
  const step = ref(1) // 每次增减的步长

  // ========== Getters（计算属性） ==========
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  const historyCount = computed(() => history.value.length)

  // ========== Actions（方法） ==========
  // 增加计数
  const increment = () => {
    const oldValue = count.value
    count.value += step.value
    addHistory('increment', oldValue, count.value)
  }

  // 减少计数
  const decrement = () => {
    const oldValue = count.value
    count.value -= step.value
    addHistory('decrement', oldValue, count.value)
  }

  // 重置计数
  const reset = () => {
    const oldValue = count.value
    count.value = 0
    addHistory('reset', oldValue, 0)
  }

  // 设置计数
  const setCount = (value) => {
    const oldValue = count.value
    count.value = value
    addHistory('setCount', oldValue, value)
  }

  // 设置步长
  const setStep = (value) => {
    step.value = value
  }

  // 添加历史记录
  const addHistory = (action, oldValue, newValue) => {
    history.value.unshift({
      action,
      oldValue,
      newValue,
      timestamp: new Date().toLocaleTimeString()
    })
    // 只保留最近 10 条记录
    if (history.value.length > 10) {
      history.value = history.value.slice(0, 10)
    }
  }

  // 清空历史记录
  const clearHistory = () => {
    history.value = []
  }

  return {
    // State
    count,
    history,
    step,
    // Getters
    doubleCount,
    isEven,
    historyCount,
    // Actions
    increment,
    decrement,
    reset,
    setCount,
    setStep,
    clearHistory
  }
})

