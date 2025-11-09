package com.learning.springboot.expensetrackerservice.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Expense extends BaseModel {
    @Column
    private Long amount;

    @Column
    private String spentWhere;

    @Column
    private String type;

    @Column
    private Date date;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn
    private Category category;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private String description;

    @PrePersist
    protected void onCreate() {
        this.date = new Date();
    }
}