package com.learning.springboot.expensetrackerservice.Controller;

import com.learning.springboot.expensetrackerservice.Models.Category;
import com.learning.springboot.expensetrackerservice.Models.Expense;
import com.learning.springboot.expensetrackerservice.Service.Category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public Optional<List<Category>> getAllCategoriesOfAUser(@RequestParam UUID userId) {
        return categoryService.getAllCategoriesOfAUser(userId);
    }

    @GetMapping("/{title}")
    public Optional<Category> getCategoryByTitle(@PathVariable String title) {
        return categoryService.getCategoryByTitle(title);
    }

    @PostMapping
    public void addCategory(@RequestBody Category category) {
        categoryService.addCategory(category);
    }

    @DeleteMapping("/{title}")
    public void deleteCategory(@PathVariable String title) {
        categoryService.deleteCategory(title);
    }
}