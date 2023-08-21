package com.ayushPanda.regressivebackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id) {
        super("Could not find TKR Symbol with id " + id);
    }
}
