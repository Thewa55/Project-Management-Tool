package com.Kenny.ppmtools.repositories;

import com.Kenny.ppmtools.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {


}
