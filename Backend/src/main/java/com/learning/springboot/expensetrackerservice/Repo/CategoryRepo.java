package com.learning.springboot.expensetrackerservice.Repo;

import com.learning.springboot.expensetrackerservice.Models.Category;
import com.learning.springboot.expensetrackerservice.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepo extends JpaRepository<Category, UUID> {
    Optional<Category> findByTitle(String title);
    void deleteByTitle(String title);

    @Query(
        "SELECT c "+
        "FROM Category c "+
        "WHERE c.user.id=:userId "
    )
    Optional<List<Category>> getAllCategoriesOfAUser(UUID userId);

    UUID user(User user);
}