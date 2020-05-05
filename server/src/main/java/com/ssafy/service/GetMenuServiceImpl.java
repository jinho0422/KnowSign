package com.ssafy.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.repository.MenuRepository;
import com.ssafy.repository.StoreRepository;
import com.ssafy.repository.WishRepository;
import com.ssafy.vo.Menu;
import com.ssafy.vo.Store;
import com.ssafy.vo.Wish;

@Service
public class GetMenuServiceImpl implements GetMenuService {

	@Autowired
	private ResourceLoader resourceLoader;

	// [START spring_vision_autowire]
	@Autowired
	private CloudVisionTemplate cloudVisionTemplate;
	// [END spring_vision_autowire]
	@Autowired
	StoreRepository storeRepository;

	@Autowired
	MenuRepository menuRepository;
	
	@Autowired
	WishRepository wishRepository;

	
	@Override
	public List<Menu> getMenu(int sId) {
		// TODO Auto-generated method stub
		List<Menu> menuList = menuRepository.findMenuByShopId(sId);

		if (menuList.size() == 0) {
			return null;
		}

		return menuList;
	}

	@Override
	public List<Wish> getAllMenu(String uId){
		List<Wish> searchList=wishRepository.findAllById(uId);
		
		if(searchList.size()==0)
			return null;
		
		return searchList;
	}
	@Override
	public List<Wish> getWishList(String uId){
		List<Wish> wishList=wishRepository.findWishById(uId);
		
		if(wishList.size()==0)
			return null;
		
		return wishList;
	}
	
	@Override
	public String extractTxt(MultipartFile image, String imageUrl) {
		// System.out.println(image.getOriginalFilename());
		// String imageUrl = image.getOriginalFilename();

		System.out.println("imgUrl = " + imageUrl);
		File dest = new File("C:/" + imageUrl);

		try {
			dest.delete();
			image.transferTo(dest);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// System.out.println(image.getName());

		String textFromImage = this.cloudVisionTemplate
				.extractTextFromImage(this.resourceLoader.getResource("file:C:/" + imageUrl));
		System.out.println();
		String[] textArr = textFromImage.split("\n");

		System.out.println(textFromImage);
		textArr[0]=textArr[0].replaceAll(" ", "");
		dest = null;
		return textArr[0];
	}
	
	@Override
	public Wish existStorebyStoreid(int sId,String uId) {
		Wish wish = wishRepository.findWishIdByStoreId(sId,uId);
		return wish;
	}

	@Override
	public int getStoreIdByStoreName(String StoreName, String imageUrl, String uId) {
		// TODO Auto-generated method stub
		List<Store> StoreList = storeRepository.findStoreIdByStoreName(StoreName);

		if (StoreList.size() == 0) {

			// 이미지 삭제 추가

			return 0;
		}

		int sId = storeRepository.findStoreIdByStoreName(StoreName).get(0).getStoreId();
		
		  File file = new File("C:\\"+imageUrl);
		  System.out.println("파일존재여부"+file.exists());
		  System.out.println(file.getPath());
		  
		  file.renameTo(new File("C:\\"+sId+uId+".png"));
		  System.out.println(file.getPath());
		 

		File file1 = new File("C:\\" + imageUrl);
		File file2 = new File("C:\\" + sId + uId + ".png");

		long fsize1 = file1.length(); // 원본 파일 크기 변환
		System.out.println("원본 파일 크기 : " + fsize1);

		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			fis = new FileInputStream(file1);
			fos = new FileOutputStream(file2);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		int input = 0, count = 0;

		byte[] data = new byte[1024];

		try {
			while ((input = fis.read(data)) != -1) {
				// 배열을 할 때는 0부터 끝까지 넣어야함
				fos.write(data, 0, input);
				count += input;

				// (읽은 바이트 수 / 전체 파일 크기) * 100
				float per = ((float) count / fsize1) * 100;
				System.out.println((int) per + "% 카피됨");

			}
			fis.close();
			fos.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (file1.exists()) {
			if (file1.delete()) {
				System.out.println("파일삭제 성공");
			} else {
				System.out.println("파일삭제 실패");
			}
		} else {
			System.out.println("파일이 존재하지 않습니다.");
		}

		return sId;
	}
}
