/*
*	描述：log_server脚本
*	作者：张亚磊
*	时间：2016/09/22
*/

require('enum.js');
require('message.js');
require('struct.js');
require('config.js');
require('util.js');

//配置管理器
var config = new Config();

function init(node_info) {
	print('log_server init, node_type:',node_info.node_type,' node_id:',node_info.node_id,' node_name:',node_info.node_name);
	config.init();
	//连接log数据库
	init_db_connect();
}

function on_msg(msg) {
	print('log_server on_msg, cid:',msg.cid,' msg_type:',msg.msg_type,' msg_id:',msg.msg_id,' sid:', msg.sid);
	
	switch(msg.msg_id) {
	case Msg.NODE_LOG_PLAYER_LOGOUT:
		log_player_logout(msg);
		break;
	default:
		print('log_server on_msg, msg_id not exist:', msg.msg_id);
		break;
	}
}

function on_drop(drop_id) {

}

function init_db_connect() {
	for(var i = 0; i < config.node_json['node'].length; i++){
		if(config.node_json['node'][i]['node_type'] == Node_Type.LOG_SERVER){
			var mysql_conf = config.node_json['node'][i]['mysql_db'];
			if(mysql_conf != null){
				for(var j = 0; j < mysql_conf.length; j++){
					var ret = connect_to_mysql(mysql_conf[j]['db_id'], mysql_conf[j]['ip'], mysql_conf[j]['port'], mysql_conf[j]['user'],
						mysql_conf[j]['password'], mysql_conf[j]['pool_name']);
					if(!ret) {
						print("connect to db ", mysql_conf['db_id'], ' error');
						return;
					}	
				}
			}
		}
	}
}

function log_player_logout(msg) {
	var logout_info = new Logout_Info();
    logout_info.role_id = msg.logout_info.role_id;
   	logout_info.role_name = msg.logout_info.role_name;
    logout_info.account = msg.logout_info.account;
    logout_info.level = msg.logout_info.level;
    logout_info.client_ip = msg.logout_info.client_ip;
    logout_info.login_time = msg.logout_info.login_time;
    logout_info.logout_time = msg.logout_info.logout_time;

	print("save role_id:", logout_info.role_id, " to logout db");
	save_db_data(DB_Id.LOG, "log.logout", logout_info);
}
