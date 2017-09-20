package net.wanho.util;


import net.sf.json.JSONObject;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;

public class HttpUtil {
    public static Logger log = Logger.getLogger(HttpUtil.class);

    public static String httpPost(String posturl, String params) {

        try {
            URL postUrl = new URL(posturl);
            HttpURLConnection connection = (HttpURLConnection) postUrl.openConnection();

            connection.setDoOutput(true);

            connection.setDoInput(true);

            connection.setRequestMethod("POST");

            connection.setUseCaches(false);

            connection.setInstanceFollowRedirects(true);

            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            connection.connect();
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());

            out.writeBytes(params);
            out.flush();
            out.close(); // flush and close
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));// 设置编码,否则中文乱码
            String line = "";
            StringBuffer resultStr = new StringBuffer("");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                resultStr.append(line);
            }

            reader.close();
            connection.disconnect();
            return resultStr.toString();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("[httpPost] exception" + e.toString());
        }
        return null;
    }

    public static String httpPost2(String posturl, String params) {

        try {
            URL postUrl = new URL(posturl);
            HttpURLConnection connection = (HttpURLConnection) postUrl.openConnection();

            connection.setDoOutput(true);

            connection.setDoInput(true);

            connection.setRequestMethod("POST");

            connection.setUseCaches(false);

            connection.setInstanceFollowRedirects(true);

            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            connection.connect();
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());

            out.write(params.getBytes("UTF-8"));
            out.flush();
            out.close(); // flush and close
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));// 设置编码,否则中文乱码
            String line = "";
            StringBuffer resultStr = new StringBuffer("");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                resultStr.append(line);
            }

            reader.close();
            connection.disconnect();
            return resultStr.toString();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("[httpPost] exception" + e.toString());
        }
        return null;
    }

    public static JSONObject doPost(String url, JSONObject json) {
        DefaultHttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(url);
        JSONObject response = null;
        try {
            StringEntity s = new StringEntity(json.toString());
            s.setContentEncoding("UTF-8");
            s.setContentType("application/json");// 发送json数据需要设置contentType
            post.setEntity(s);
            HttpResponse res = client.execute(post);
            if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                HttpEntity entity = res.getEntity();
                String result = EntityUtils.toString(res.getEntity());// 返回json格式：
                response = JSONObject.fromObject(result);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    /**
     * 发送get请求
     *
     * @param url
     *            路径
     * @return
     */
    public static String httpGet(String url) {
        // get请求返回结果
        JSONObject jsonResult = null;
        try {
            DefaultHttpClient client = new DefaultHttpClient();
            // 发送get请求
            HttpGet request = new HttpGet(url);
            HttpResponse response = client.execute(request);

            /** 请求发送成功，并得到响应 **/
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                /** 读取服务器返回过来的json字符串数据 **/
                String strResult = EntityUtils.toString(response.getEntity());
                /** 把json字符串转换成json对象 **/
                jsonResult = JSONObject.fromObject(strResult);
                url = URLDecoder.decode(url, "UTF-8");
            } else {
                log.error("get请求提交失败:" + url);
            }
        } catch (IOException e) {
            log.error("get请求提交失败:" + url, e);
        }
        return jsonResult.toString();
    }



//    String resultStr = HttpUtil.httpPost(MENU_GET_GET_URL+this.accessToken, "");
//    JSONObject menuObject = JSONObject.parseObject(resultStr);
//    Menu menu = menuObject.getObject("menu", Menu.class);
}
