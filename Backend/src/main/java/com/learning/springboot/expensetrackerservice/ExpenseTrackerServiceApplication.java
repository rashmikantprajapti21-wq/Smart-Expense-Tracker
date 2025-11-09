package com.learning.springboot.expensetrackerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class ExpenseTrackerServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ExpenseTrackerServiceApplication.class, args);
    }
}