<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
getChannelList()
</script>

<template>
  <el-form-item label="Category:" style="width: 300px">
    <el-select
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :style="{ width }"
    >
      <el-option
        v-for="channel in channelList"
        :label="channel.cate_name"
        :value="channel.id"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
