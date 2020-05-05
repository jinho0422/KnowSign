package com.ssafy.controller;

import java.io.Console;
import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.repository.StoreRepository;
import com.ssafy.repository.WishRepository;
import com.ssafy.service.GetMenuService;
import com.ssafy.service.WishService;
import com.ssafy.vo.Menu;
import com.ssafy.vo.Wish;

@CrossOrigin("*")
@RestController
@RequestMapping("getMenu")
public class GetMenuController {

	@Autowired
	GetMenuService service;
	@Autowired
	WishService wishService;
	@Autowired
	WishRepository wishRepository;
	@Autowired
	StoreRepository storeRepository;
	
	@PostMapping(value="menu/{uId}") // detail을 위한 menu
	public ResponseEntity<Map<String, Object>> getMenuList(@RequestBody String req,
			@PathVariable("uId") String uId) throws Exception {
		// service.getTextByImg(image
		System.out.println("menu");
		System.out.println(req);
		JSONObject jObject=new JSONObject(req);
		int sId=jObject.getInt("sId");
		Wish wish=service.existStorebyStoreid(sId,uId);
		System.out.println(wish);
		Map<String, Object> map = new HashMap<String, Object>();
		
		if (sId == 0) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.BAD_REQUEST);
		}
		String storeName=storeRepository.findStoreNameById(sId);
		System.out.println(service.getMenu(sId));
		map.put("menu", service.getMenu(sId));
		map.put("sId", sId);
		map.put("sName",storeName);
		map.put("favorite", wish.getFavorite());
		map.put("imageSource", wish.getUri());
		System.out.println("sid="+sId);
		System.out.println("storeName="+storeName);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	
	@PostMapping(value = "/{uId}") // 이미지 추출
	public ResponseEntity<Map<String, Object>> getMenu(@RequestBody MultipartFile image,
			@PathVariable("uId") String uId) throws Exception {
		// service.getTextByImg(image
		
		SimpleDateFormat format1 = new SimpleDateFormat("yyyyMMddHHmmss");
		Date time = new Date();
		String time1 = format1.format(time);
		String imageUrl = time1 + uId+".png";
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 1. 이미지에서 텍스트 추출(이미지 이름(현재시간+userid)
		String storeName = service.extractTxt(image, imageUrl);
		// 2. 텍스트에 해당하는 storeid 빼오기
		// 2-2. 스토정보 없을 경우 이미지 삭제 ,
		// 2-3 sId=0 일경우
		// return new ResponseEntity<Map<String, List>>(null,HttpStatus.BAD_REQUEST);
		// 3. sid+uid 로 이미지 이름 바꿔주기
		int sId = service.getStoreIdByStoreName(storeName, imageUrl, uId);

		if (sId == 0) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.BAD_REQUEST);
		}
		// 처음으로 검색한 내용 저장
		Wish wish=service.existStorebyStoreid(sId,uId);
		if(wish==null) {
			wishService.addWish(uId, sId);
			System.out.println("add wishlist");
			map.put("menu", service.getMenu(sId));
			map.put("sId", sId);
			map.put("sName",storeName);
			map.put("favorite", false);
		}
		else {
			System.out.println("already exist");
			wish.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
			map.put("menu", service.getMenu(sId));
			map.put("sId", sId);
			map.put("sName",storeName);
			map.put("favorite", wish.getFavorite());
		}
		// 4. sid 에 해당하는 메뉴 보내주기 (List<menu>+sid)
		
		System.out.println("sid="+sId);
		System.out.println("storeName="+storeName);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@PostMapping(value = "/addwish/{uId}") // wish추가
	public ResponseEntity<Void> addWish(@PathVariable("uId") String uId, @RequestBody String req) {
		// service.getTextByImg(image);
		System.out.println("wish");
		System.out.println(req);
		
		JSONObject jObject=new JSONObject(req);
		int sId=jObject.getInt("sId");
		boolean favorite=jObject.getBoolean("favorite");
		Wish wish=service.existStorebyStoreid(sId,uId);
		System.out.println(wish);
		wish.setfavorite(favorite);
		wishRepository.save(wish);
		return new ResponseEntity<Void>( HttpStatus.OK);
	}
	
	@PostMapping(value="/wishlist/{uId}")
	public ResponseEntity<List<Map<String, Object>> > getWish(@PathVariable("uId") String uId){
		List <Wish> WishList=service.getWishList(uId);
		System.out.println(WishList);
		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		
		for(int i=0;i<WishList.size();i++)
		{
			Map<String, Object> map = new HashMap<String, Object>();
			Wish wish=WishList.get(i);
			map.put("sId", wish.getStoreId());
			map.put("uri", wish.getUri());
			String sName=storeRepository.findStoreNameById(wish.getStoreId());
			if(sName==null)
				continue;
			map.put("sName", sName);
			
			map.put("favorite", wish.getFavorite());
			listMap.add(map);
		}
		
		return new ResponseEntity<List<Map<String, Object>>>(listMap, HttpStatus.OK);
		
	}
	
	@PostMapping(value="/wishlist/num/{uId}")
	public ResponseEntity<Map<String, Object> > getWishnum(@PathVariable("uId") String uId){
		List <Wish> WishList=service.getWishList(uId);
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(WishList==null) {
			map.put("like",(Object)0);
		}
		
		else {
			System.out.println(WishList);
			map.put("like", (Object)WishList.size());
			}
		
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		
	}
	
	@PostMapping(value = "/test")
	public ResponseEntity<String> extractTxt(@RequestParam("image") MultipartFile image) {
		// service.getTextByImg(image);
		
		
		return new ResponseEntity<String>("asdf",HttpStatus.OK);

	}

	@GetMapping(value="/all/{uId}")
	public ResponseEntity<List<Map<String, Object>> > getAllMenu(@PathVariable("uId") String uId){
		List <Wish> WishList=service.getAllMenu(uId);
		System.out.println(WishList);
		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		if(WishList==null)
		{
			return new ResponseEntity<List<Map<String, Object>>>(listMap, HttpStatus.OK);
		}
		for(int i=0;i<WishList.size();i++)
		{
			Map<String, Object> map = new HashMap<String, Object>();
			Wish wish=WishList.get(i);
			map.put("sId", wish.getStoreId());
			map.put("uri", wish.getUri());
			String sName=storeRepository.findStoreNameById(wish.getStoreId());
			if(sName==null)
				continue;
			map.put("sName", sName);
			map.put("favorite", wish.getFavorite());
			listMap.add(map);
		}
		
		return new ResponseEntity<List<Map<String, Object>>>(listMap, HttpStatus.OK);
		
	}
}