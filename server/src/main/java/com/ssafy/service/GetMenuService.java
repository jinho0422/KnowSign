package com.ssafy.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.vo.Menu;
import com.ssafy.vo.Wish;


public interface GetMenuService {

	List<Menu> getMenu(int sId);
	List<Wish> getAllMenu(String uid);
	List<Wish> getWishList(String uid);
	String extractTxt(MultipartFile image,String ImageUrl);
	int getStoreIdByStoreName(String StoreName,String ImageUrl,String uId);
	Wish existStorebyStoreid(int sId,String uId);
	
}
