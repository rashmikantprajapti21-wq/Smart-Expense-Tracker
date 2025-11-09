package com.learning.springboot.expensetrackerservice.Service.Category;

import com.learning.springboot.expensetrackerservice.Models.Category;
import com.learning.springboot.expensetrackerservice.Models.Expense;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryService {
    void addCategory(Category category);
    void deleteCategory(String title);
    Optional<Category> getCategoryByTitle(String title);
    Optional<List<Category>> getAllCategoriesOfAUser(UUID userId);
}
