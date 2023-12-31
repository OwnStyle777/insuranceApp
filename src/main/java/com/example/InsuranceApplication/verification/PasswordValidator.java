package com.example.InsuranceApplication.verification;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

public interface PasswordValidator {

    default boolean validatePassword(String password) {
        if (!isPasswordLengthOK(password)) {
            return false;
        }
        if (!containsPasswordSpecialChar(password)) {
            return false;
        }
        if (!containsPasswordDigit(password)) {
            return false;
        }
        if (!containsPasswordUppercase(password)) {
            return false;
        }
        if (!containsPasswordLowercase(password)) {
            return false;
        }
        return true;
    }

    default boolean isPasswordLengthOK(String password) {
        int length = password.length();
        return length >= 10 && length <= 35;
    }

    default boolean containsPasswordSpecialChar (String password) {
        return containsCharacter(password, "@#$%^&+=!");
    }

    default boolean containsPasswordDigit (String password) {
        return containsCharacter(password, "0123456789");
    }

    default boolean containsCharacter (String password, String regex) {
        for (char c : password.toCharArray()) {
            if (regex.contains(String.valueOf(c))) {
                return true;
            }
        }
        return false;
    }

    default boolean containsPasswordUppercase(String password) {
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) {
                return true;
            }
        }
        return false;
    }

    default boolean containsPasswordLowercase (String password) {
        for (char c : password.toCharArray()) {
            if (Character.isLowerCase(c)) {
                return true;
            }
        }
        return false;
    }

    default boolean isPasswordValid (String enteredPassword, String hashedPasswordFromDatabase) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(enteredPassword, hashedPasswordFromDatabase);
    }

    default String getHashedPassword (String password) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }


}
