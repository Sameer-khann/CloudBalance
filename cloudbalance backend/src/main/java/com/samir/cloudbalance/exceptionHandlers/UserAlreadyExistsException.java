package com.samir.cloudbalance.exceptionHandlers;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException(String message){
        super(message);
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public String handleValidationExceptions(MethodArgumentNotValidException ex) {
//        return ex.getBindingResult().getFieldError().getDefaultMessage();
//    }
}