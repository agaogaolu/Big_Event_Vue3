<script setup>
import { artAddChannelsService, artEditChannelsService } from '@/api/article';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
    cate_name: '',
    cate_alias: ''
})

const rules = {
    cate_name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
        }
    ],
    cate_alias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
        {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
        }
    ]
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
    await formRef.value.validate()
    const isEdit = formModel.value.id
    if (isEdit) {
        await artEditChannelsService(formModel.value)
        ElMessage.success('edit success')
    } else {
        await artAddChannelsService(formModel.value)
        ElMessage.success('add success')
    }
    dialogVisible.value = false
    emit('success')
}

const open = (row) => {

    dialogVisible.value = true
    formModel.value = { ...row }
    console.log(row)
}

defineExpose({
    open
})
</script>
<template>
    <el-dialog v-model="dialogVisible" :title="formModel.id ? 'edit' : 'add'" width="30%">
        <el-form ref="formRef" :rules="rules" :model="formModel">
            <el-form-item label="CatrgoryName" prop="cate_name">
                <el-input v-model="formModel.cate_name" placeholder="hint"></el-input>
            </el-form-item>
            <el-form-item label="CatrgoryAlies" prop="cate_alias">
                <el-input v-model="formModel.cate_alias"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>