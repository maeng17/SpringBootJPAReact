package user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import user.bean.UserUploadDTO;

import java.util.List;

@Repository
public interface UserUploadDAO extends JpaRepository<UserUploadDTO, Integer> {

    public List<UserUploadDTO> findAllByOrderBySeqDesc();

    public UserUploadDTO findBySeq(int seq);
}
