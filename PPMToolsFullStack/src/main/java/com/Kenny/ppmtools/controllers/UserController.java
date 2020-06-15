package com.Kenny.ppmtools.controllers;

import com.Kenny.ppmtools.domain.User;
import com.Kenny.ppmtools.services.UserService;
import com.Kenny.ppmtools.services.ValidationService;
import com.Kenny.ppmtools.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        //validate password
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationService.MapValidationService(result);
        if(errorMap != null ) return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User> (newUser,HttpStatus.OK);
    }


}
