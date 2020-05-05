package com.ssafy.vo;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Wish {

	@Id
	private int wishId;
	private int storeId;	
	private String userId;
	private boolean favorite;
	private String uri;
	private Timestamp updated_At;
	
	public Wish(int wishId, int storeId, String userId) {
		super();
		this.wishId = wishId;
		this.storeId = storeId;
		this.userId = userId;
	}
	
	public Wish(int storeId, String userId) {
		super();
		this.storeId = storeId;
		this.userId = userId;
	}

	public Wish() {
		super();
	}
	public int getWishId() {
		return wishId;
	}
	public void setWishId(int wishId) {
		this.wishId = wishId;
	}
	public void setfavorite(boolean favorite) {
		this.favorite=favorite;
	}
	public int getStoreId() {
		return storeId;
	}
	public boolean getFavorite() {
		return favorite;
	}
	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setUri(String uri) {
		this.uri=uri;
	}
	public String getUri() {
		return uri;
	}
	public void setUpdateTime(Timestamp now) {
		this.updated_At=now;
	}
	@Override
	public String toString() {
		return "Wish [wishId=" + wishId + ", storeId=" + storeId + ", userId=" + userId +", uri="+uri+"]";
	}
	
	
	
}
