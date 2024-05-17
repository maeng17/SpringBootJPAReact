package user.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import user.bean.UserDTO;

@Repository
public interface UserDAO extends JpaRepository<UserDTO, String>{
	
	//쿼리 메소드
	public List<UserDTO> findByNameContaining(String value);
	public List<UserDTO> findByIdContaining(String value);
	
	//검색 대상이 테이블이 아니라 영속성 컨텍스트에 등록된 엔티티이다.
	// ?1는 첫번째 파라메터를 의미한다.
	/*
	@Query("select dto from UserDTO dto where dto.name like concat('%', ?1, '%')")
	public List<UserDTO> getUserSearchName(String value);
	
	@Query("select dto from UserDTO dto where dto.id like concat('%', ?1, '%')")
	public List<UserDTO> getUserSearchId(String value);
	*/
	
	@Query("select dto from UserDTO dto where dto.name like concat('%', :value, '%')")
	public Page<UserDTO> getUserSearchName(@Param("value") String value, Pageable pageable);
	
	@Query("select dto from UserDTO dto where dto.id like concat('%', :value, '%')")
	public Page<UserDTO> getUserSearchId(@Param("value") String value, Pageable pageable);

}












