package net.wanho.util;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * HttpServletResponse相关工具类
 *
 */
public class ResponseUtil
{
    private static final Logger logger = Logger.getLogger(ResponseUtil.class);

    /**
     * 
     * @param response
     * @param msg
     */
    public static void write(HttpServletResponse response, Object msg)
    {
        write(response, JackJson.fromObjectToJson(msg));
    }

    /**
     * HttpServletResponse输出方法
     * 
     * @param response
     * @param s
     */
    public static void write(HttpServletResponse response, String s)
    {
        PrintWriter write = null;
        try
        {
            // begin add by zhaocy3 on 20130703
            // 所有AJAX请求页面不缓存数据
            response.setHeader("Cache-Control", "no-cache");
            // end add by zhaocy3 on 20130703
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            write = response.getWriter();
            write.write(s);
            write.flush();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        finally
        {
            if (null != write)
            {
                write.close();
            }
        }
    }

    /**
     * URL重定向
     * 
     * @param response
     * @param url
     */
    public static void sendRedirect(HttpServletResponse response, String url)
    {
        try
        {
            response.sendRedirect(url);
        }
        catch (IOException e)
        {
            logger.error(e.getMessage(), e);
        }
    }

}
