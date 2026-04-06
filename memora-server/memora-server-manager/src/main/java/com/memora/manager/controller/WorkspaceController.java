package com.memora.manager.controller;

import com.memora.common.result.Result;
import com.memora.manager.service.WorkspaceService;
import com.memora.manager.vo.WorkspaceDashboardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/workspaces/current")
@RequiredArgsConstructor
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @GetMapping("/dashboard")
    public Result<WorkspaceDashboardVO> getDashboard() {
        return Result.success(workspaceService.getCurrentWorkspaceDashboard());
    }
}
