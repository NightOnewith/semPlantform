package net.wanho.util;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.util.JSONUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 将各种格式的数据转换成json字符串的工具类
 */
public class JsonUtil {
	private static JsonConfig jsonConfig1 = new JsonConfig();
	private static JsonConfig jsonConfig2 = new JsonConfig();
	
	static{
		jsonConfig1.registerJsonValueProcessor(Date.class , new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
		jsonConfig2.registerJsonValueProcessor(Date.class , new DateJsonValueProcessor("yyyy-MM-dd"));
	}
	

	/**
	 * 将传入的对象转换成json字符串
	 * 
	 * @param toStringFlag true:表示Integer、Long、Double类型的值，json格式化后值为字符串类型，而不是数值类型
	 * 
	 * @return json字符串
	 */
	public static String getJsonFromObj(Object o,boolean toStringFlag){
		if(o == null){
			return "{}";
		}
		// json配置
		JsonConfig jc = new JsonConfig();
		if(toStringFlag){
			// 配置Integer类型转换值
			jc.registerJsonValueProcessor(Integer.class,new JsonValueProcessor(){
				public Object processArrayValue(Object arg0, JsonConfig arg1) {
					if(arg0 == null){
						return "";
					}
					return arg0.toString();
				}
	
				public Object processObjectValue(String arg0,
						Object arg1, JsonConfig arg2) {
					if(arg1 == null){
						return "";
					}
					return arg1.toString();
				}
	        });
			// 配置Long类型转换值
			jc.registerJsonValueProcessor(Long.class,new JsonValueProcessor(){
				public Object processArrayValue(Object arg0, JsonConfig arg1) {
					if(arg0 == null){
						return "";
					}
					return arg0.toString();
				}
	
				public Object processObjectValue(String arg0,
						Object arg1, JsonConfig arg2) {
					if(arg1 == null){
						return "";
					}
					return arg1.toString();
				}
	        });
			// 配置Double类型转换值
			jc.registerJsonValueProcessor(Double.class,new JsonValueProcessor(){
				public Object processArrayValue(Object arg0, JsonConfig arg1) {
					if(arg0 == null){
						return "";
					}
					return arg0.toString();
				}
	
				public Object processObjectValue(String arg0,
						Object arg1, JsonConfig arg2) {
					if(arg1 == null){
						return "";
					}
					return arg1.toString();
				}
	        });
		}
		JSONObject jsonObj = JSONObject.fromObject(o,jc);
		
		return jsonObj.toString();
	}
	
	/**
	 * 将传入的对象按照jsonConfigFormat将date日期转换
	 * 
	 * @param o 待转换对象
	 * 
	 * @param jsonConfigFormat date日期类型
	 * 
	 * @param defaultValueIsNull true:表示Integer、Long、Double类型的值，json格式化后值为""，而不是0
	 * 
	 * @param toStringFlag toStringFlag true:表示Integer、Long、Double类型的值，json格式化后值为字符串类型，而不是数值类型
	 * 
	 * @return json字符串
	 */
	public static String getJsonFromObj(Object o,String jsonConfigFormat,boolean defaultValueIsNull,boolean toStringFlag){
		JsonConfig jc = new JsonConfig();
		
		try{
			if(jsonConfigFormat == null || jsonConfigFormat.trim().length() == 0){
				jc = jsonConfig2;
			}else{
				jc.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(jsonConfigFormat));
				
			}
			// 默认值为""
			if(defaultValueIsNull){
				// 设置Integer默认值为""
				jc.registerDefaultValueProcessor(Integer.class,				
						new DefaultValueProcessor() {
							public Object getDefaultValue(Class type) {
								return "";
							}
						});
				// 设置Double默认值为""
				jc.registerDefaultValueProcessor(Double.class,				
						new DefaultValueProcessor() {
							public Object getDefaultValue(Class type) {
								return "";
							}
						});
				// 设置Long默认值为""
				jc.registerDefaultValueProcessor(Long.class,				
						new DefaultValueProcessor() {
							public Object getDefaultValue(Class type) {
								return "";
							}
						}); 
			}
			// 数值型转String
			if(toStringFlag){
				// 配置Integer类型转换值
				jc.registerJsonValueProcessor(Integer.class,new JsonValueProcessor(){
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						if(arg0 == null){
							return "";
						}
						return arg0.toString();
					}
		
					public Object processObjectValue(String arg0,
							Object arg1, JsonConfig arg2) {
						if(arg1 == null){
							return "";
						}
						return arg1.toString();
					}
		        });
				// 配置Long类型转换值
				jc.registerJsonValueProcessor(Long.class,new JsonValueProcessor(){
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						if(arg0 == null){
							return "";
						}
						return arg0.toString();
					}
		
					public Object processObjectValue(String arg0,
							Object arg1, JsonConfig arg2) {
						if(arg1 == null){
							return "";
						}
						return arg1.toString();
					}
		        });
				// 配置Double类型转换值
				jc.registerJsonValueProcessor(Double.class,new JsonValueProcessor(){
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						if(arg0 == null){
							return "";
						}
						return arg0.toString();
					}
		
					public Object processObjectValue(String arg0,
							Object arg1, JsonConfig arg2) {
						if(arg1 == null){
							return "";
						}
						return arg1.toString();
					}
		        });
			}
		}catch(Exception e){
			e.printStackTrace();
			jc = jsonConfig2;
		}
		JSONObject jsonObj = JSONObject.fromObject(o, jc);
		
		return jsonObj.toString();
	}
	
	/**
	 * 将传入的对象转换成json字符串，用于日志打印
	 * 
	 * @return json字符串
	 */
	public static String getJsonFromObjForLog(Object o){
		// 初始化默认值
		JsonConfig jsonConfig = new JsonConfig();
		// 设置Integer默认值为null
		initDefaultValue(Integer.class,jsonConfig);
		// 设置Double默认值为null
		initDefaultValue(Double.class,jsonConfig);
		// 设置Long默认值为null
		initDefaultValue(Long.class,jsonConfig);
		
		JSONObject jsonObj = JSONObject.fromObject(o,jsonConfig);
		
		return jsonObj.toString();
	}

	/**
	 * 将传入的list列表转换成符合ligerui grid格式的json字符串, 
	 * 例如：{"results" : [{'key1' : 'value1', 'key2' : value2}, {...}], "totalCount" : totalCount}
	 * 
	 * @param totalCount
	 * @param lst
	 * @param jsonConfigFormat 日期格式字符串，例如：yyyy-MM-dd
	 * @return 符合ligerui grid格式的json字符串
	 *
	 * 2012-10-31
	 */
	public static String getGridJsonFromList(long totalCount, List<?> lst, String jsonConfigFormat){
		JsonStore store = new JsonStore();
		store.setTotalCount(totalCount);
		store.setResults(lst);
		
		JsonConfig jc = new JsonConfig();
		
		try{
			if(jsonConfigFormat == null || jsonConfigFormat.trim().length() == 0){
				jc = jsonConfig2;
			}else{
				jc.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(jsonConfigFormat));
			}
		}catch(Exception e){
			e.printStackTrace();
			jc = jsonConfig2;
		}
		
		JSONObject jsonObj = JSONObject.fromObject(store, jc);
		
		return jsonObj.toString();
	}
	
	/**
	 * 将传入的list列表转换成符合ligerui grid格式的json字符串, 例如：{"results" : [{'key1' : 'value1', 'key2' : value2}, {...}], "totalCount" : totalCount}
	 * 
	 * @return 符合ligerui grid格式的json字符串
	 */
	public static String getGridJsonFromList(long totalCount, List<?> lst){
		JsonStore store = new JsonStore();
		store.setTotalCount(totalCount);
		store.setResults(lst);
		
		JSONObject jsonObj = JSONObject.fromObject(store, jsonConfig1);
		
		return jsonObj.toString();
	}

	/**
	 * 将传入的list列表转换成对象格式的json字符串, 例如：{'key1' : 'value1', 'key2' : value2}
	 * 
	 * @return json字符串
	 */
	public static String getObjectJsonFromList(List<?> lst){
		JSONObject jsonObj = JSONObject.fromObject(lst, jsonConfig1);
		
		return jsonObj.toString();
	}

	/**
	 * 将传入的list列表转换成数组格式的json字符串, 例如：[{'name' : 'zhangsan', age : 20}, {'name' : 'lisi', age : 18}]
	 * 
	 * @param lst 待转换的list列表
	 * 
	 * @return 数组格式的json字符串
	 */
	public static String getArrayJsonFromList(List<?> lst){
		if(lst == null){
			return "[]";
		}
		JSONArray jsonArr = JSONArray.fromObject(lst, jsonConfig1);
		
		return jsonArr.toString();
	}

	/**
	 * 将传入的list列表转换成符合下拉树格式的json字符串, 例如：[{'text' : 'zhangsan', id : 20, chidren : [{...}]}, {'text' : 'lisi', id : 18, chidren : null}]
	 * 
	 * @param lst 待转换的list列表
	 * 
	 * @return 数组格式的json字符串
	 */
	public static String getTreeJsonFromList(List<?> lst){
		if(lst == null){
			return "[]";
		}
		// 初始化默认值
		JsonConfig jsonConfig = new JsonConfig();
		// 设置List默认值为null
		initDefaultValue(List.class,jsonConfig);
		
		JSONArray jsonArr = JSONArray.fromObject(lst, jsonConfig);
		
		return jsonArr.toString();
	}
	
	/**
	 * 初始化默认值
	 * @return
	 */
	public static JsonConfig initDefaultValue(Class<?> classType,JsonConfig jsonConfig){
		jsonConfig.registerDefaultValueProcessor(classType,				
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return null;
					}
				});
		
		return jsonConfig;
	}
	
	/**
	 * 将一个格式正确的json字符串转换成java对象, 正确的格式为{{key1 : value1, key2 : value2, ...},
	 * {key1 : value1, key2 : value2, ...}...}
	 * 
	 * @param json
	 *            对象格式的Json字符串
	 * @param root
	 *            目标对象
	 * @param classMap
	 *            目标对象中集合内的对象，例如：对象A中含有List&lt;B&gt; bList, B中含有List&lt;C&gt;
	 *            cList, 其中，bList和cList均为属性名，可以这样创建classMap： Map&lt;String,
	 *            Class&lt;?&gt;&gt; classMap = new HashMap&lt;String, Class&lt;?&gt;&gt;();
	 *            classMap.put("bList", B.class); classMap.put("cList",
	 *            C.class); 如果要转换的对象中没有集合类(List, Array, Map等)，请将本参数设为null
	 *            
	 * @param dateFormat
	 * 			  日期格式字符串，默认为yyyy-MM-dd HH:mm:ss 
	 * 
	 * 
	 * @return 目标对象
	 * 
	 * @since  2012-10-31
	 */
	public static Object getObjectFromJson(String json, Class<?> root,
			Map<String, Class<?>> classMap, String dateFormat) {
		if (json == null || json.trim().length() == 0) {
			return null;
		}
		if(dateFormat == null || dateFormat.trim().length() == 0){
			dateFormat = "yyyy-MM-dd HH:mm:ss";
		}
		// 注册日期类型 add by meixiao
		JSONUtils.getMorpherRegistry().registerMorpher(
				new DateMorpher(new String[] {dateFormat}));
		try {
			// 先将json字符串转换成JSONObject对象
			JSONObject jsonObj = JSONObject.fromObject(json);
			// 再将JSONObject对象转换成对应的java类
			if (classMap == null) {
				return JSONObject.toBean(jsonObj, root);
			} else {
				return JSONObject.toBean(jsonObj, root, classMap);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public static String printJson(Integer success,String resMsg,String json)
	{
		if(json == null){
			return "{\"resultCode\" : \"" + success.toString() + "\", \"resultMsg\" : \"" + resMsg + "\"}";
		}else{
			return "{\"resultCode\" : \"" + success.toString() + "\", \"resultMsg\" : \"" + resMsg + "\" ," +json+"}";
		}
	}
	
	/**
	 * 返回对象的字符串表示，如果源对象为null，则返回空字符串
	 * 
	 * @param src 源对象
	 * @return 对象的字符串表示
	 */
	public static String nullToString(Object src){
		if(src == null){
			return "";
		}
		
		return src.toString();
	}

	/** 
	* @Title: getJsonFromMap
	* @author zhimingyou  
	* @Description: Map to Json 
	* @param parameters
	* @return String
	* @throws 
	*/
	public static String getJsonFromMap(HashMap<String, String> parameters) {
		JSONArray json = JSONArray.fromObject(parameters); 
		return json.toString();
	}
}
