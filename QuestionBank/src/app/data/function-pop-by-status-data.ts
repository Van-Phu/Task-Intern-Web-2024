import { icon } from "@fortawesome/fontawesome-svg-core"

const Function = [
    {id: 0, name: "Xem chi tiết", icon: "fa-regular fa-eye"},
    {id: 1, name: "Chỉnh sửa", icon: "fa-solid fa-pencil"},
    {id: 2, name:"Gửi duyệt", icon: "fa-solid fa-share"},
    {id: 3, name: "Phê duyệt",  icon: "fa-regular fa-circle-check"},
    {id: 4, name: "Ngưng hiển thị", icon: "fa-solid fa-circle-minus"},
    {id: 5, name: "Trả về", icon: "fa-solid fa-reply"},
    {id: 6, name: "Xóa", icon: "fa-solid fa-trash"}
]

export const FunctionStatus = [
    {
        id: 0, function: [
            {id: 0, name: "Xem chi tiết", icon: "fa-regular fa-eye"},
            {id: 2, name:"Gửi duyệt", icon: "fa-solid fa-share"}, 
            {id: 6, name: "Xóa", icon: "fa-solid fa-trash"}
        ]
    },
    {
        id: 1, function: [
            {id: 1, name: "Chỉnh sửa", icon: "fa-solid fa-pencil"},
            {id: 3, name: "Phê duyệt",  icon: "fa-regular fa-circle-check"},
            {id: 5, name: "Trả về", icon: "fa-solid fa-reply"},
        ]
    },
    {
        id: 2, function: [
            {id: 0, name: "Xem chi tiết", icon: "fa-regular fa-eye"},
            {id: 4, name: "Ngưng hiển thị", icon: "fa-solid fa-circle-minus"}
        ]
    },
    {
        id: 3, function: [  
            {id: 0, name: "Xem chi tiết", icon: "fa-regular fa-eye"},
            {id: 3, name: "Phê duyệt",  icon: "fa-regular fa-circle-check"}, 
            {id: 5, name: "Trả về", icon: "fa-solid fa-reply"},
        ]
    },
    {
        id: 4, function: [
            {id: 1, name: "Chỉnh sửa", icon: "fa-solid fa-pencil"},
            {id: 2, name:"Gửi duyệt", icon: "fa-solid fa-share"}
        ]
    },
]