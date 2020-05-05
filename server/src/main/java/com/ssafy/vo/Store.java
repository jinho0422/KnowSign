package com.ssafy.vo;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Store {
	@Id
	private int StoreId;
	private String StoreName;
	public Store(int storeId, String storeName) {
		super();
		StoreId = storeId;
		StoreName = storeName;
	}
	
	public Store() {
		super();
	}

	public int getStoreId() {
		return StoreId;
	}
	public void setStoreId(int storeId) {
		StoreId = storeId;
	}
	public String getStoreName() {
		return StoreName;
	}
	public void setStoreName(String storeName) {
		StoreName = storeName;
	}
	@Override
	public String toString() {
		return "Store [StoreId=" + StoreId + ", StoreName=" + StoreName + "]";
	}
	
	
}
