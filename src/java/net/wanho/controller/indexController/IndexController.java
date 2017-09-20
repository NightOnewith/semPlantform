package net.wanho.controller.indexController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by xiaochao on 2017/6/2 17:05.
 */
@Controller
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/toMain")
    public String toMain(){
        return "main";
    }

    @RequestMapping("/toProductAdvantage")
    public String toProductAdvantage(){
        return "productAdvantage";
    }

    @RequestMapping("/toProductDetail")
    public String toProductDetail(){
        return "productDetail";
    }

    @RequestMapping("/toPayment")
    public String toPayment(){
        return "payment";
    }

    @RequestMapping("/toMarketMenu")
    public String toProductDetail1(){
        return "marketMenu";
    }

    @RequestMapping("/toCloudResource")
    public String toCloudResource(){
        return "cloudResource";
    }

    @RequestMapping("/toCommerec")
    public String toCommerec(){
        return "commerec";
    }

    @RequestMapping("toGover")
    public String toGover() {
        return "goverEnterprise";
    }

    @RequestMapping("/toSolution")
    public String toSolution(){
        return "solution";
    }

    @RequestMapping("error")
    public String toError() {
        return "public/404";
    }

}
