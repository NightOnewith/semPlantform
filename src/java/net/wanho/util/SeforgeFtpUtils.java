package net.wanho.util;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.SocketException;


/**
 * 实现FTP 客户端的各种操作
 */
public class SeforgeFtpUtils {

    private static final Logger logger = LoggerFactory.getLogger(SeforgeFtpUtils.class);

    private SeforgeFtpUtils() {
    }

    private static SeforgeFtpUtils seforgeFtpUtils = new SeforgeFtpUtils();

    public static SeforgeFtpUtils getInstance(String ip, int port, String userName, String password, String
            defaultServerPath) {
        SeforgeFtpUtils.defaultServerPath = defaultServerPath;

        seforgeFtpUtils.connectServer(ip, port, userName, password);

        return seforgeFtpUtils;
    }

    /**
     * FTP 客户端代理
     */
    private static FTPClient ftpClient = null;

    /**
     * ftp服务器文件路径
     */
    private static String defaultServerPath;
    /**
     * FTP
     */
    private static final String[] FILE_TYPES = {"文件", "目录", "符号链接", "未知类型"};
    /**
     * 传输模式为二进制文件.
     */
    public static final int BINARY_FILE_TYPE = FTP.BINARY_FILE_TYPE;
    /**
     * 传输模式为ASCII，默认为ASCII
     */
    public static final int ASCII_FILE_TYPE = FTP.ASCII_FILE_TYPE;
    public static int i = 1;

    public static void main(String[] args) throws FileNotFoundException {
        // setConfigFile("ftpconfig.properties");// 设置配置文件路径
        // makeDirectory("eeee");
        SeforgeFtpUtils instance = SeforgeFtpUtils.getInstance("10.20.16.172", 21, "smeftp", "XCjApiWdDmPnd8cb",
                "/aidata/aiappserver/files/");

        // changeWorkingDirectory("webroot");//进入文件夹webroot
        // listRemoteFiles("*.jsp");//列出webroot目录下所有jsp文件
        instance.setFileType(FTP.BINARY_FILE_TYPE);// 设置传输二进制文件

        //uploadFile("G:/临时文件/万维公司员工交通通讯报销标准（2008修订版）.doc",
        //        "中国人也/万维公司员工交通通讯报销标准（2008修订版）.doc");//
        // 上传文件woxingwosu.xml，重新命名为myfile.xml
        // renameFile("viewDetail.jsp",
        // "newName.jsp");//将文件viewDetail.jsp改名为newName.jsp
//        uploadManyFile("G:/临时文件/staxmem", "dirdirdir/");
        // deleteFile("/testtest/");//删除一个文件UpdateData.class
        // deleteEmptyDirectory("dfd");//
        // loadFile("jakarta-oro-2.0.8.jar", "E:/tmp/00000000000000001.jpg");//

        // 01.jpg，并且重新命名为G:/临时文件/00000000000000001.jpg
        // uploadFile("G:/临时文件");


        instance.uploadFile(new FileInputStream("D:\\src\\828-348.png"), "20161031/828-348.png");


        instance.downLoadFile("/aidata/aiappserver/files/20161031/828-348.png", "d:/src/3.png");

        // listRemoteFiles("eeee");// 列出所有文件和目录
        // listRemoteFiles("58-20166.jpg");// 列出指定的文件和目录
        instance.closeConnect();// 关闭连接
    }

    /**
     * 上传单个文件，并重命名
     *
     * @param inputFile   输入流
     * @param newFileName 新的文件名,可以包含路径。如 20161101/文件名.jpg
     * @return true 上传成功，false 上传失败
     */
    public boolean uploadFile(InputStream inputFile, String newFileName) {
        if (null == inputFile || StringUtils.isBlank(newFileName)) {
            throw new RuntimeException("inputFile or newFileName is null");
        }

        boolean flag = true;
        try {


            ftpClient.setFileType(BINARY_FILE_TYPE);
            // ftp.setFileType(FTP.ASCII_FILE_TYPE);
            ftpClient.enterLocalPassiveMode();
            // ftp.changeWorkingDirectory(remoteDir);
            ftpClient.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);

            File newFile = new File(newFileName);
            File parentFile = newFile.getParentFile();
            if (null != parentFile) {
                String dir = parentFile.getPath();
                dir = defaultServerPath + dir;
                if (!ftpClient.changeWorkingDirectory(dir)) {// 如果不能进入dir下，说明此目录不存在！
                    if (!makeDirectory(parentFile.getPath())) {
                        System.out.println("创建文件目录【" + dir + "】 失败！");
                    }
                }
                changeWorkingDirectory(dir);// 回到FTP根目录
            }

            String[] newFileNameSplit = newFileName.split("/");
            newFileName = newFileNameSplit[newFileNameSplit.length - 1];


            flag = ftpClient.storeFile(newFileName, inputFile);
            if (flag) {
                System.out.println("upload File succeed");

            } else {
                System.out.println("upload File false");

            }
            inputFile.close();

        } catch (IOException e) {
            logger.error("本地文件上传失败！", e);
        } catch (Exception e) {
            logger.error("本地文件上传失败！", e);
        }
        return flag;
    }

//    /**
//     * 上传多个文件
//     *
//     * @param localFilePath--本地文件夹路径
//     * @return true 上传成功，false 上传失败
//     */
//    public static String uploadManyFile(String localFile) {
//        boolean flag = true;
//        StringBuffer strBuf = new StringBuffer();
//        int n = 0;
//        try {
//            connectServer();
//            File file = new File(localFile);// 在此目录中找文件
//
//            File file2[] = file.listFiles();
//
//            for (int i = 0; i < file2.length; i ) {
//
//                File file1 = new File(file2[i].getAbsolutePath());
//                if (file1.isDirectory()) {// 文件夹中还有文件夹
//                    uploadManyFile(file2[i].getAbsolutePath());
//                } else {
//                    flag = uploadFile(file2[i].getAbsolutePath(), "");
//                }
//                if (!flag) {
//                    n ;
//                    strBuf.append(file2[i].getName() "\r\n");
//
//                }
//            }
//            if (n > 0) {
//
//                strBuf.insert(0, "共有" n "上传失败，分别为\r\n");
//            }
//            System.out.println(strBuf.toString());
//        } catch (NullPointerException e) {
//            e.printStackTrace();
//            // logger.debug("本地文件上传失败！找不到上传文件！", e);
//            // TODO: handle exception
//        } catch (Exception e) {
//            e.printStackTrace();
//            logger.debug("本地文件上传失败！", e);
//            // TODO: handle exception
//        }
//        return strBuf.toString();
//    }
//
//    /**
//     * 上传多个文件
//     *
//     * @param localFilePath--本地文件夹路径
//     * @param newFileName--目标路径
//     * @return true 上传成功，false 上传失败
//     */
//    public static String uploadManyFile(String localFile, String newFileName) {
//        boolean flag = true;
//        StringBuffer strBuf = new StringBuffer();
//        int n = 0;
//        try {
//            connectServer();
//            File file = new File(localFile);// 在此目录中找文件
//
//            File file2[] = file.listFiles();
//
//            for (int i = 0; i < file2.length; i ) {
//
//                File file1 = new File(file2[i].getAbsolutePath());
//                System.out.println(file1.isFile());
//                if (file1.isDirectory()) {// 文件夹中还有文件夹
//
//                    uploadManyFile(file2[i].getAbsolutePath(), newFileName);
//                } else {
//                    String tmpNewFileName = "";
//                    if (newFileName.substring(newFileName.length() - 1).equals(
//                            "/")) {
//
//                        tmpNewFileName = newFileName file2[i].getName();
//                    } else {
//
//                        tmpNewFileName = newFileName "/" file2[i].getName();
//                    }
//                    System.out.println(tmpNewFileName);
//                    flag = uploadFile(file2[i].getAbsolutePath(),
//                            tmpNewFileName);
//                }
//                if (!flag) {
//                    n ;
//                    strBuf.append(file2[i].getName() "\r\n");
//
//                }
//            }
//            if (n > 0) {
//
//                strBuf.insert(0, "共有" n "上传失败，分别为\r\n");
//            }
//            System.out.println(strBuf.toString());
//        } catch (NullPointerException e) {
//            e.printStackTrace();
//            logger.debug("本地文件上传失败！找不到上传文件！", e);
//            // TODO: handle exception
//        } catch (Exception e) {
//            e.printStackTrace();
//            logger.debug("本地文件上传失败！", e);
//            // TODO: handle exception
//        }
//        return strBuf.toString();
//    }
//

    /**
     * 下载文件
     *
     * @param remoteFileName       --服务器上的文件名
     * @param localFileName--本地文件名
     * @return true 下载成功，false 下载失败
     */
    public boolean downLoadFile(String remoteFileName, String localFileName) {
        boolean flag = true;
        // 下载文件
        BufferedOutputStream buffOut = null;
        try {
            buffOut = new BufferedOutputStream(new FileOutputStream(
                    localFileName));
            flag = ftpClient.retrieveFile(remoteFileName, buffOut);
        } catch (Exception e) {
            logger.error("本地文件下载失败！", e);
        } finally {
            try {
                if (buffOut != null) {
                    buffOut.close();
                }
            } catch (Exception e) {
                logger.error(e.getMessage(), e);

            }

        }

        if (flag) {
            System.out.println("download file success");
        } else {
            System.out.println("download file fail");
        }

        return flag;
    }
//
//    /**
//     * 删除一个文件
//     */
//    public static boolean deleteFile(String filename) {
//        boolean flag = true;
//        try {
//            connectServer();
//
//            flag = ftpClient.deleteFile(filename);
//            if (flag) {
//                System.out.println("delete  File succeed");
//
//            } else {
//                System.out.println("delete File false");
//
//            }
//        } catch (IOException ioe) {
//            ioe.printStackTrace();
//        }
//        return flag;
//    }
//
//    /**
//     * 删除目录
//     */
//    public static void deleteDirectory(String pathname) {
//        try {
//            connectServer();
//            File file = new File(pathname);
//            if (file.isDirectory()) {
//                File file2[] = file.listFiles();
//            } else {
//                deleteFile(pathname);
//
//            }
//            ftpClient.removeDirectory(pathname);
//        } catch (IOException ioe) {
//            ioe.printStackTrace();
//        }
//    }
//
//    /**
//     * 删除空目录
//     */
//    public static void deleteEmptyDirectory(String pathname) {
//        try {
//            connectServer();
//            ftpClient.removeDirectory(pathname);
//        } catch (IOException ioe) {
//            ioe.printStackTrace();
//        }
//    }

//    /**
//     * 列出服务器上文件和目录
//     *
//     * @param regStr
//     *            --匹配的正则表达式
//     */
//    @SuppressWarnings("unchecked")
//    public static void listRemoteFiles(String regStr) {
//        connectServer();
//        try {
//            // ftpClient.changeWorkingDirectory(regStr);
//            String files[] = ftpClient.listNames(regStr);
//            if (files == null || files.length == 0)
//                System.out.println("There has not any file!");
//            else {
//                for (int i = 0; i < files.length; i ) {
//                    System.out.println(files[i]);
//
//                }
//
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    /**
//     * 列出Ftp服务器上的所有文件和目录
//     *
//     */
//    public static void listRemoteAllFiles() {
//        connectServer();
//        try {
//            String[] names = ftpClient.listNames();
//            for (int i = 0; i < names.length; i ) {
//                System.out.println(names[i]);
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    /**
     * 关闭连接
     */
    public void closeConnect() {
        try {
            if (ftpClient != null) {
                ftpClient.logout();
                ftpClient.disconnect();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 设置传输文件的类型[文本文件或者二进制文件]
     *
     * @param fileType--BINARY_FILE_TYPE、ASCII_FILE_TYPE
     */
    public void setFileType(int fileType) {
        try {
            ftpClient.setFileType(fileType);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 扩展使用
     *
     * @return
     */
    protected static FTPClient getFtpClient() {
        return ftpClient;
    }

    /**
     * 连接到服务器
     *
     * @return true 连接服务器成功，false 连接服务器失败
     */
    private boolean connectServer(String ip, int port, String userName, String password) {
        boolean flag = true;
        ftpClient =null;
        if (ftpClient == null) {
            int reply;
            try {
                ftpClient = new FTPClient();
                ftpClient.setControlEncoding("GBK");
                ftpClient.setDefaultPort(port);
                ftpClient.configure(getFtpConfig());
                ftpClient.connect(ip);
                ftpClient.login(userName, password);
                ftpClient.setDefaultPort(port);
                reply = ftpClient.getReplyCode();
                ftpClient.setDataTimeout(120000);

                if (!FTPReply.isPositiveCompletion(reply)) {
                    ftpClient.disconnect();
                    System.err.println("FTP server refused connection.");
                    logger.error("FTP 服务拒绝连接！");
                    flag = false;
                }
            } catch (SocketException e) {
                flag = false;
                System.err.println("登录ftp服务器【" + ip + "】失败,连接超时！");
                logger.error("登录ftp服务器【" + ip + "】失败");
            } catch (IOException e) {
                flag = false;
                System.err.println("登录ftp服务器【" + ip + "】失败，FTP服务器无法打开！");
                logger.error("登录ftp服务器【" + ip + "】失败");
            }
        }
        return flag;
    }

    /**
     * 进入到服务器的某个目录下
     *
     * @param directory
     */
    public void changeWorkingDirectory(String directory) {
        try {
            ftpClient.changeWorkingDirectory(directory);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

//    /**
//     * 返回到上一层目录
//     */
//    public static void changeToParentDirectory() {
//        try {
//            connectServer();
//            ftpClient.changeToParentDirectory();
//        } catch (IOException ioe) {
//            ioe.printStackTrace();
//        }
//    }

    /**
     * 重命名文件
     *
     * @param oldFileName --原文件名
     * @param newFileName --新文件名
     */
    public static void renameFile(String oldFileName, String newFileName) {
        try {
            ftpClient.rename(oldFileName, newFileName);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    /**
     * 设置FTP客服端的配置--一般可以不设置
     *
     * @return
     */
    private static FTPClientConfig getFtpConfig() {
        FTPClientConfig ftpConfig = new FTPClientConfig(
                FTPClientConfig.SYST_UNIX);
        ftpConfig.setServerLanguageCode(FTP.DEFAULT_CONTROL_ENCODING);
        return ftpConfig;
    }

    /**
     * 转码[ISO-8859-1 -> GBK] 不同的平台需要不同的转码
     *
     * @param obj
     * @return
     */
    private static String iso8859togbk(Object obj) {
        try {
            if (obj == null)
                return "";
            else
                return new String(obj.toString().getBytes("iso-8859-1"), "GBK");
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * 在服务器上创建一个文件夹
     *
     * @param dir 文件夹名称，不能含有特殊字符，如 \ 、/ 、: 、* 、?、 "、 <、>...
     */
    public static boolean makeDirectory(String dir) {
        boolean flag = true;
        try {
            // System.out.println("dir=======" dir);
            flag = ftpClient.makeDirectory(dir);
            if (flag) {
                System.out.println("make Directory " + dir + " succeed");

            } else {

                System.out.println("make Directory " + dir + " false");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }


}