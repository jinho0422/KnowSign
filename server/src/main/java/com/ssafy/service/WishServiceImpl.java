package com.ssafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.repository.WishRepository;
import com.ssafy.vo.Wish;

@Service
public class WishServiceImpl implements WishService {

	@Autowired
	WishRepository wishRepository;
	
	@Override
	public void addWish(String uId, int sId) {
		// TODO Auto-generated method stub
		
		Wish wish=new Wish(sId,uId);
		System.out.println(wish.toString());
		wishRepository.save(wish);
		
	}

}
