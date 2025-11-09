package com.learning.springboot.expensetrackerservice.Controller;

import com.learning.springboot.expensetrackerservice.Models.Expense;
import com.learning.springboot.expensetrackerservice.Service.Report.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/report")
@CrossOrigin
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/credit/{user_id}")
    public Long totalCredited(@PathVariable UUID user_id){
        return reportService.totalCredited(user_id);
    }

    @GetMapping("/debit/{userId}")
    public Long totalDebited(@PathVariable UUID userId){
        return reportService.totalDebited(userId);
    }

    @GetMapping("/category")
    public List<Object[]> categoryWiseSpend(@RequestParam UUID userId){
        return reportService.categoryWiseSpend(userId);
    }

    @GetMapping("/balance")
    public Long currentMonthBalance(@RequestParam UUID userId){
        return reportService.currentBalance(userId);
    }

    @GetMapping("/purchase/most-expensive")
    public Expense mostExpensivePurchase(@RequestParam UUID userId){
        return reportService.mostExpensivePurchase(userId);
    }

    @GetMapping("/daily")
    public List<Object[]> dailySpendInAMonth(@RequestParam UUID userId){
        return reportService.dailySpendingInAMonth(userId);
    }
}
