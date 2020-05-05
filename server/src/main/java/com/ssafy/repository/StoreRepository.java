package com.ssafy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.vo.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

	@Query(value = "select * from store s where  s.store_name=:sName", nativeQuery = true)
	List<Store>  findStoreIdByStoreName(@Param("sName")String sName);
	
	@Query(value="select store_name from store where store_id=:sId",nativeQuery=true)
	String findStoreNameById(@Param("sId") int sId);
}
