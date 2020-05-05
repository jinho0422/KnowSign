package com.ssafy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.ssafy.vo.Menu;
@Repository
public interface MenuRepository extends JpaRepository<Menu,Long > {

	@Query(value = "select * from menu m where  m.store_id = :sId", nativeQuery = true)
	List<Menu>  findMenuByShopId(@Param("sId") int sId);
	
}