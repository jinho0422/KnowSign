package com.ssafy.vo;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Menu {
//디비 구성
//테이블 : 가게, 메뉴 
//가게테이블 : 시퀀스, 가게이름kor, 가게이름eng
//메뉴테이블: 시퀀스, 가게인덱스, 메뉴이름kor, 메뉴이름eng, 가격, 메뉴설명kor, 메뉴설명eng
	@Id
	private int  menuId;
	private String menuNameKor;
	private String menuNameEng;
	private String menuDescriptionKor;
	private String menuDescriptionEng;
	private String price;
	public Menu(int menuId, String menuNameKor, String menuNameEng, String menuDescriptionKor,
			String menuDescriptionEng, String price) {
		super();
		this.menuId = menuId;
		this.menuNameKor = menuNameKor;
		this.menuNameEng = menuNameEng;
		this.menuDescriptionKor = menuDescriptionKor;
		this.menuDescriptionEng = menuDescriptionEng;
		this.price = price;
	}
	
	public Menu() {
		super();
	}

	public int getMenuId() {
		return menuId;
	}
	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}
	public String getMenuNameKor() {
		return menuNameKor;
	}
	public void setMenuNameKor(String menuNameKor) {
		this.menuNameKor = menuNameKor;
	}
	public String getMenuNameEng() {
		return menuNameEng;
	}
	public void setMenuNameEng(String menuNameEng) {
		this.menuNameEng = menuNameEng;
	}
	public String getMenuDescriptionKor() {
		return menuDescriptionKor;
	}
	public void setMenuDescriptionKor(String menuDescriptionKor) {
		this.menuDescriptionKor = menuDescriptionKor;
	}
	public String getMenuDescriptionEng() {
		return menuDescriptionEng;
	}
	public void setMenuDescriptionEng(String menuDescriptionEng) {
		this.menuDescriptionEng = menuDescriptionEng;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "Menu [menuId=" + menuId + ", menuNameKor=" + menuNameKor + ", menuNameEng=" + menuNameEng
				+ ", menuDescriptionKor=" + menuDescriptionKor + ", menuDescriptionEng=" + menuDescriptionEng
				+ ", price=" + price + "]";
	}
		
	
	
}
