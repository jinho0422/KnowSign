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
@RequestMapping("setMenu")
public class SetMenuController {

	@Autowired
	GetMenuService service;
	@Autowired
	WishService wishService;
	@Autowired
	WishRepository wishRepository;
	@Autowired
	StoreRepository storeRepository;

	@PostMapping(value = "/uri/{uId}")
	public ResponseEntity<Void> setUri(@PathVariable("uId") String uId, @RequestBody String req) {
		// service.getTextByImg(image);
		System.out.println("uri");
		System.out.println(req);
		
		JSONObject jObject=new JSONObject(req);
		int sId=jObject.getInt("sId");
		String uri=jObject.getJSONObject("uri").toString();
		Wish wish=service.existStorebyStoreid(sId,uId);
		System.out.println(wish);
		wish.setUri(uri);
		wishRepository.save(wish);
		return new ResponseEntity<Void>( HttpStatus.OK);
	}

	
	
}