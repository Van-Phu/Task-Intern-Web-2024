import { icon } from "@fortawesome/fontawesome-svg-core";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

export const DrawerLeftData = [
    {name :"Đánh giá nhân sự", icon: 'fa-solid fa-list-ul', child:
    [
        {icon: "fa-solid fa-pencil", nameChild:"Ngân hàng câu hỏi", route: '/questions'},
    ]
    },{
        name: "Chất lượng dịch vụ", icon: "fa-regular fa-user", child:
        [
            {icon: "fa-solid fa-pencil", nameChild:"DV",  route: '/question'},
        ]
        
    },
    {
        name: "Sản phẩm", icon:"fa-solid fa-shop", child:
        [
            {icon: "fa-solid fa-pencil", nameChild:"Shop",  route: '/question'},
        ]
    }

]