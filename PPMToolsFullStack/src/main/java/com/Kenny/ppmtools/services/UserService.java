package com.Kenny.ppmtools.services;

import com.Kenny.ppmtools.domain.User;
import com.Kenny.ppmtools.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //username needs to be unique
        //make sure password and confirm password matches
        //we dont persist or show confirmpassword
        return userRepository.save(newUser);
//        try{}catch{}
    }
}
