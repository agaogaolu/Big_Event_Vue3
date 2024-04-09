<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artDelChannelsService, artGetChannelsService } from '@/api/article.js'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus';
const channelList = ref([])

const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
    loading.value = true
    const res = await artGetChannelsService()
    channelList.value = res.data.data
    // channelList.value = []
    loading.value = false
}

const onEditChannel = (row) => {
    dialog.value.open(row)
    // console.log(row)
}
const onDelChannel = async (row) => {
    await ElMessageBox.confirm('Confirm DEL?', 'Attention', {
        type: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    })
    await artDelChannelsService(row.id)
    ElMessage.success('Del success')
    getChannelList()
    // dialog.value.open(row)
    // console.log(row)
}
const onAddChannel = () => {
    dialog.value.open()
}


const onSuccess = () => {
    getChannelList()
}



getChannelList()
</script>
<template>
    <page-container title="Cluster">
        <template #extra>
            <el-button @click="onAddChannel">Add Cluster</el-button>
        </template>
        <el-table v-loading="loading" :data="channelList" style="width: 100%;">
            <el-table-column type="index" label="ID"></el-table-column>
            <el-table-column prop="cate_name" label="Class"></el-table-column>
            <el-table-column prop="cate_alias" label="Class Alias"></el-table-column>
            <el-table-column label="Operate">
                <template #default="{ row, $index }">
                    <el-button :icon="Edit" @click="onEditChannel(row)" plain circle type="primary"></el-button>
                    <el-button :icon="Delete" @click="onDelChannel(row)" plain circle type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="No data"></el-empty>
            </template>
        </el-table>
        <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    </page-container>
</template>
<style lang="scss" scoped></style>