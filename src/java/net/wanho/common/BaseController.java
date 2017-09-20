package net.wanho.common;

import net.wanho.page.PageContext;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Controller
public class BaseController {

    protected Log logger = LogFactory.getLog(BaseController.class);


    /**
     * 向客户端返回指定json字符串
     *
     * @param json     json字符串
     * @param response
     */
    protected void printJson(String json, HttpServletResponse response) {
        if (response == null) {
            return;
        }

        try {
            response.setContentType("application/json;charset=UTF-8");

            if (json == null) {
                response.getWriter().write("{}");
            } else {
                response.getWriter().write(json);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 向客户端返回成功或失败消息的json字符串，如果参数success为true，返回成功消息，否则返回失败消息
     *
     * @param success  成功或失败
     * @param msg      返回页面的提示信息
     * @param response
     */
    protected void printSuccess(boolean success, String msg, HttpServletResponse response) {
        if (response == null) {
            return;
        }

        try {
            response.setContentType("application/json;charset=UTF-8");

            if (msg == null || msg.trim().length() == 0) {
                response.getWriter().write("{\"success\" : " + success + "}");
            } else {
                response.getWriter().write("{\"success\" : " + success + ", \"msg\" : \"" + msg + "\"}");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 向客户端返回成功或失败消息的json字符串，如果参数success为true，返回成功消息，否则返回失败消息
     *
     * @param success  成功或失败
     * @param response
     */
    protected void printSuccess(boolean success, HttpServletResponse response) {
        this.printSuccess(success, null, response);
    }

    /**
     * 生成分页本地线程
     *
     * @param currPage 当前页码
     * @param pageSize 页面大小
     */
    protected PageContext createPage(int currPage, int pageSize) {
        PageContext page = PageContext.createPage();
        page.setCurrentPage(currPage);
        page.setPageSize(pageSize);
        return page;
    }

    /**
     * 用于移动客户端客户端返回json
     *
     * @param success
     * @param resMsg
     * @param json
     * @return
     */
    protected String printJsonM(Integer success, String resMsg, String json) {
        if (json == null) {
            return "{\"resultCode\" : \"" + success.toString() + "\", \"resultMsg\" : \"" + resMsg + "\"}";
        } else {
            return "{\"resultCode\" : \"" + success.toString() + "\", \"resultMsg\" : \"" + resMsg + "\" ," + json +
                    "}";
        }
    }






    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    /**
     * 日志测试方法运行时间
     *
     * @param text
     * @param bt
     * @param et
     */
    protected void logger(String text, Long bt, Long et) {
        if (null == et) {
            logger.info("进入 " + text + " " + new Date(bt));
        } else {
            logger.info("退出 " + text + " 所需要时间为 " + (et - bt) + " 毫秒");
        }
    }




    /**
     * 设置分页及排序信息
     *
     * @param request HttpServletRequest
     * @return PageContext
     */
    protected PageContext setPageContext(HttpServletRequest request) {
        PageContext page = PageContext.createPage();

        String currentPage = request.getParameter("currentPage");//jqgrid 自带当前页参数“page”
        String pageSize = request.getParameter("pageSize");//jqgrid 自带当前页显示记录数“rows”

        page.setCurrentPage(StringUtils.isBlank(currentPage) ? 1 : Integer.parseInt(currentPage));
        page.setPageSize(StringUtils.isBlank(pageSize) ? 10 : Integer.parseInt(pageSize));

        return page;
    }

    protected void hasPermission(String permissionCode,HttpServletRequest request,HttpServletResponse response){
        String basePath = request.getScheme() + "://" + request.getServerName()
                + ":" + request.getServerPort() + request.getContextPath();
        HttpSession session = request.getSession();
        Set<String> permissionSet = (Set<String>) session.getAttribute("userPermissions");
        if (null == permissionSet || !permissionSet.contains(permissionCode)){
            try {
                response.sendRedirect(basePath+"/login/error");
            } catch (IOException e) {
                logger.error("重定向到404页面失败");
            }
        }
    }


}
