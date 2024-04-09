import request from '@/utils/request'

export const artGetChannelsService = () => {
    return request.get('/my/cate/list')
}

export const artAddChannelsService = (data) => {
    return request.post('/my/cate/add', data)
}

export const artEditChannelsService = (data) => {
    return request.put('/my/cate/info', data)
}

export const artDelChannelsService = (id) => {
    return request.delete('/my/cate/del', {
        params: { id }
    })
}


export const artGetListService = (params) =>
    request.get('/my/article/list', {
        params
    })