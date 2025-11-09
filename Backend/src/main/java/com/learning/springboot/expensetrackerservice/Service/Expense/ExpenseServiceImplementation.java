package com.learning.springboot.expensetrackerservice.Service.Expense;

import com.learning.springboot.expensetrackerservice.Models.Category;
import com.learning.springboot.expensetrackerservice.Models.Expense;
import com.learning.springboot.expensetrackerservice.Models.User;
import com.learning.springboot.expensetrackerservice.Repo.CategoryRepo;
import com.learning.springboot.expensetrackerservice.Repo.ExpenseRepo;
import com.learning.springboot.expensetrackerservice.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExpenseServiceImplementation implements ExpenseService {

private final ExpenseRepo expenseRepo;
private final CategoryRepo categoryRepo;
private final UserRepo userRepo;

@Autowired
public ExpenseServiceImplementation(ExpenseRepo expenseRepo, CategoryRepo categoryRepo, UserRepo userRepo) {
    this.expenseRepo = expenseRepo;
    this.categoryRepo = categoryRepo;
    this.userRepo = userRepo;
}

    @Override
    public Optional<List<Expense>> getAllExpenses() {
        return Optional.of(expenseRepo.findAll());
    }

    @Override
    public Page<Expense> getAllExpensePaginatedAndSorted(UUID userId, int offset, int pageSize, String field) {
        return expenseRepo.findAllByUserId(userId, PageRequest.of(offset, pageSize, Sort.by(field).descending()));
    }


    @Override
    public Optional<Expense> getSingleExpense(UUID id) {
        return expenseRepo.findById(id);
    }

    @Override
    @Transactional
    public void addExpense(Expense expense) {
        // Check if the category already exists
        Optional<Category> existingCategory = categoryRepo.findByTitle(expense.getCategory().getTitle());
        Optional<User> existingUser = userRepo.findById(expense.getUser().getId());

        // If the category already exists, set it, else save the new category
        if (existingCategory.isPresent()) {
            expense.setCategory(existingCategory.get());
        } else {
            Category savedCategory = categoryRepo.save(expense.getCategory());  // Save the new category
            expense.setCategory(savedCategory);
        }

        if(existingUser.isPresent())
            expense.setUser(existingUser.get());
        else{
            User savedUser = userRepo.save(expense.getUser());
            expense.setUser(savedUser);
        }
        // Save the expense
        expenseRepo.save(expense);
    }

    @Override
    public List<Expense> getExpensesByUserId(UUID userId) {
        return expenseRepo.findByUserId(userId);
    }
}