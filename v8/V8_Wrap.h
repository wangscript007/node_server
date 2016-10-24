/*
 * V8_Wrap.h
 *
 *  Created on: Feb 1, 2016
 *      Author: zhangyalei
 */

#ifndef V8_WRAP_H_
#define V8_WRAP_H_

#include "include/v8.h"

using namespace v8;

//创建v8运行环境
Local<Context> create_context(Isolate* isolate);
//函数说明：引用js文件   参数：1.文件路径   返回值：无
void require(const FunctionCallbackInfo<Value>& args);
//函数说明：读取json配置文件   参数：1.文件路径   返回值：文件内容字符串对象
void read_json(const FunctionCallbackInfo<Value>& args);
//函数说明：打印日志 参数：可变参数列表   返回值：无
void print(const FunctionCallbackInfo<Value>& args);
//函数说明：hash运算   参数：进行hash运算的字符串 返回值：hash值
void hash(const FunctionCallbackInfo<Value>& args);
//函数说明：生成token  参数：1.帐号名    返回值：token
void generate_token(const FunctionCallbackInfo<Value>& args);
//函数说明：生成id	参数：1.db_id 2.table_name 3. type 返回值：id
void generate_id(const FunctionCallbackInfo<Value>& args);
//函数说明：注册定时器到c++层		参数：1.定时器id 2.定时器间隔(毫秒单位) 3.从注册定时器到下次定时器到期中间间隔秒数	返回值：无
void register_timer(const FunctionCallbackInfo<Value>& args);

//根据消息id生成相应的结构体
std::string get_struct_name(int msg_type, int msg_id);
//函数说明：发送消息object	参数：1.endpoint_id 2.cid 3.msg_id 4.msg_type 5.extra 6.消息object   返回值：无
void send_msg(const FunctionCallbackInfo<Value>& args);
//函数说明：关闭客户端连接  	参数：1.endpoint_id 2.drop_cid 3.drop_code    返回值：无
void close_session(const FunctionCallbackInfo<Value>& args);

//函数说明：连接mysql数据库数据		参数：1.db_id 2.ip 3.port	 返回值：连接成功
void connect_to_mongo(const FunctionCallbackInfo<Value>& args);
//函数说明：连接mysql数据库数据		参数：1.db_id 2.ip 3.port 4.user 5.password 6.pool_name	返回值：连接成功
void connect_to_mysql(const FunctionCallbackInfo<Value>& args);
//函数说明：获取表索引	参数：1.db_id 2.table_name 3.query_name 4.query_value 返回值：数据库索引
void select_table_index(const FunctionCallbackInfo<Value>& args);
//函数说明：读取数据库数据		参数：1.db_id, 2.table_name 3.key_index  返回值：数据object
void load_db_data(const FunctionCallbackInfo<Value>& args);
//函数说明：保存数据库数据		参数：1.db_id 2.table_name 3.数据object	返回值：无
void save_db_data(const FunctionCallbackInfo<Value>& args);
//函数说明：保存单条数据		参数：1.db_id 2.table_name 3.数据object	返回值：无
void save_single_data(Isolate* isolate, int db_id, std::string &table_name, Local<v8::Object> object);
//函数说明：删除数据库数据		参数：1.db_id 2.table_name 3.数据array		返回值：无
void delete_db_data(const FunctionCallbackInfo<Value>& args);

#endif /* V8_WRAP_H_ */
