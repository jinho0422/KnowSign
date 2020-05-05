package com.ssafy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.vo.Menu;
import com.ssafy.vo.Store;
import com.ssafy.vo.Wish;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
	
	@Query(value = "select * from store s where  s.store_name =:sName", nativeQuery = true)
	Store  findStoreIdByStoreName(@Param("sName")String sName);
	
	@Query(value="select * from wish where wish.store_id =:sId and wish.user_id=:uId",nativeQuery=true)
	Wish findWishIdByStoreId(@Param("sId") int sId,@Param("uId") String uId);

	@Query(value="select * from wish where wish.user_id=:uId order by updated_At desc",nativeQuery=true)
	List<Wish> findAllById(@Param("uId") String uId);
	
	@Query(value="select * from wish w where w.user_id=:uId and w.favorite=true order by updated_At desc",nativeQuery=true)
	List<Wish> findWishById(@Param("uId") String uId);
}
