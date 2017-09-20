package net.wanho.controller.buyerController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by xiaochao on 2017/6/10 14:40.
 */
@Controller
@RequestMapping("/buyer")
public class BuyerController {

    @RequestMapping("/toBuyerOrder")
    public String toBuyerOrder(){
        return "buyer/buyerOrder";
    }

    @RequestMapping("/toMyApps")
    public String toMyApps(){
        return "buyer/myApps";
    }

    @RequestMapping("/toCar")
    public String toCar(){
        return "buyer/car";
    }

    @RequestMapping("/toInfo")
    public String toInfo(){
        return "buyer/info";
    }

    @RequestMapping("toAccount")
    public String toAccount() {
        return "buyer/account";
    }

}
