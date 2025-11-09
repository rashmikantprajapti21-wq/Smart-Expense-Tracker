package com.learning.springboot.expensetrackerservice.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Category extends BaseModel {
    private String title;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Expense> expenseList;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}