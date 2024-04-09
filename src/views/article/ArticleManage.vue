<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetChannelsService, artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const articleList = ref([])
const total = ref(0)
const loading = ref(false)

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const articleEditRef = ref()

const onAddArticle = () => {
  articleEditRef.value.open({})
}

const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}

const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total

  loading.value = false
}
getArticleList()
</script>

<template>
  <page-container title="Manager">
    <template #extra>
      <el-button @click="onAddArticle()">Add Article</el-button>
    </template>
    <el-form inline>
      <channel-select v-model="params.cate_id" width="100%"></channel-select>
      <el-form-item label="Status:">
        <el-select v-model="params.state">
          <el-option label="posted" value="已发布">posted</el-option>
          <el-option label="draft" value="草稿">draft</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-button @click="onSearch" type="primary">Search</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="Title" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Category" prop="cate_name"></el-table-column>
      <el-table-column label="Post Time" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="state"></el-table-column>
      <el-table-column label="Operate">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 2, 3, 5]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <article-edit ref="articleEditRef"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
