package net.wanho.controller.sellerController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by xiaochao on 2017/6/10 14:40.
 */
@Controller
@RequestMapping("/seller")
public class SellerController {

    @RequestMapping("/toSellerCenter")
    public String toSellerCenter(){
        return "seller/sellerCenter";
    }

    @RequestMapping("/toGoodsManagement")
    public String toGoodsManagement(){
        return "seller/goodsManagement";
    }

    @RequestMapping("/toSellerUploadGoods")
    public String toSellerUploadGoods(){
        return "seller/sellerUploadGoods";
    }

    @RequestMapping("/toSellerOrderCenter")
    public String toSellerOrderCenter(){
        return "seller/sellerOrderCenter";
    }

    @RequestMapping("toFinanceManagement")
    public String toFinanceManagement() {
        return "seller/financeManagement";
    }

    @RequestMapping("/toSellerTradeHistory")
    public String toSellerTradeHistory(){
        return "seller/sellerTradeHistory";
    }

    @RequestMapping("/toInfoManage")
    public String toInfoManage(){
        return "seller/infoManage";
    }

    @RequestMapping("/toAccountManage")
    public String toAccountManage(){
        return "seller/accountManage";
    }


}
