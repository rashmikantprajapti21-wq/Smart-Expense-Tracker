package com.learning.springboot.expensetrackerservice.Service.Category;

import com.learning.springboot.expensetrackerservice.Models.Category;
import com.learning.springboot.expensetrackerservice.Models.Expense;
import com.learning.springboot.expensetrackerservice.Repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImplementation implements CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public void addCategory(Category category) {
        Optional<Category> existingCategory = categoryRepo.findByTitle(category.getTitle());
        if (existingCategory.isEmpty())
            categoryRepo.save(category);
    }

    @Override
    public void deleteCategory(String title) {
        categoryRepo.deleteByTitle(title);
    }

    @Override
    public Optional<Category> getCategoryByTitle(String title) {
    return categoryRepo.findByTitle(title);
}

    @Override
    public Optional<List<Category>> getAllCategoriesOfAUser(UUID userId) {
        return categoryRepo.getAllCategoriesOfAUser(userId);
    }
}
