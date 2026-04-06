package com.memora.manager.controller;

import com.memora.common.result.Result;
import com.memora.manager.dto.AuthLoginDTO;
import com.memora.manager.service.AuthService;
import com.memora.manager.vo.AuthSessionVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public Result<AuthSessionVO> login(@Valid @RequestBody AuthLoginDTO dto) {
        return Result.success(authService.login(dto));
    }

    @GetMapping("/session")
    public Result<AuthSessionVO> getCurrentSession() {
        return Result.success(authService.getCurrentSession());
    }
}
