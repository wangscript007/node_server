/*
*	描述：邮件系统
*	作者：张亚磊
*	时间：2016/02/24
*/

function Mail() {
	this.game_player = null;
	this.mail_info = null;
}

Mail.prototype.load_data = function(game_player, player_data) {
	this.game_player = game_player;
	this.mail_info = player_data.mail_info;
}
	
Mail.prototype.save_data = function(player_data) {
	player_data.mail_info = this.mail_info;
}

Mail.prototype.fetch_mail_info = function() {
	var msg_res = new Object();
	msg_res.mail_list = new Array();
	this.mail_info.mail_map.forEach(function(value, key, map) {
		msg_res.mail_list.push(value);
	});
    this.game_player.send_msg(Msg.RES_MAIL_INFO, msg_res);
}

Mail.prototype.pickup_mail = function(msg) {
	var msg_res = new Object();
	msg_res.mail_id_list = new Array();
	if (msg.mail_id == 0) {
		this.mail_info.mail_map.forEach(function(value, key, map) {
			var result = this.pickup_item_money(value);
			if (result == 0) {
			    msg_res.mail_id_list.push(key);
			}
    	});
	} else {
		var mail_detail = this.mail_info.mail_map.get(msg.mail_id);
		if (mail_detail == null) {
			return this.game_player.send_error_msg(Error_Code.CLIENT_PARAM_ERROR);
		}
		
		var result = this.pickup_item_money(value);
		if (result == 0) {
		    msg_res.mail_id_list.push(msg.mail_id);
		}
	}
	this.game_player.send_msg(Msg.RES_PICKUP_MAIL, msg_res);
}

Mail.prototype.delete_mail = function(msg) {
	var msg_res = new Object();
	msg_res.mail_id_list = new Array();
	if (msg.mail_id == 0) {
		this.mail_info.mail_map.forEach(function(value, key, map) {
			var result = this.pickup_item_money(value);
			if (result == 0) {
			    msg_res.mail_id_list.push(key);
			}
    	});
    	this.mail_info.mail_map.clear();
	} else {
		var mail_detail = this.mail_info.mail_map.get(msg.mail_id);
		if (mail_detail == null) {
			return this.game_player.send_error_msg(Error_Code.CLIENT_PARAM_ERROR);
		}
		
		var result = this.pickup_item_money(value);
		if (result == 0) {
		    msg_res.mail_id_list.push(msg.mail_id);
			this.mail_info.mail_map.delete(msg.mail_id);
		}
	}
	this.game_player.send_msg(Msg.RES_DEL_MAIL, msg_res);
}

Mail.prototype.receive_mail = function(mail_detail) {
	this.mail_info.total_count++;
	mail_detail.mail_id = 1000000 + total_count;
	this.mail_info.mail_map.set(mail_detail.mail_id, mail_detail);
}

Mail.prototype.pickup_item_money = function(mail_detail) {	
	var result = this.game_player.bag.insert_item_list(mail_detail.item_list);
	if (result != 0) {
		return result;
	}
	
	result = this.game_player.add_money(mail_detail.gold, mail_detail.diamond);
	if (result != 0) {
		return result;
	}
	
	mail_detail.pickup = true;
	this.game_player.data_change = true;
	return 0;
}
