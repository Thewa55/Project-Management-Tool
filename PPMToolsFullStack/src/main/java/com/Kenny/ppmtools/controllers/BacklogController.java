package com.Kenny.ppmtools.controllers;

import com.Kenny.ppmtools.domain.Project;
import com.Kenny.ppmtools.domain.ProjectTask;
import com.Kenny.ppmtools.services.ProjectTaskService;
import com.Kenny.ppmtools.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private ValidationService validationService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlog_id, Principal principal){
        ResponseEntity<?> errorMap = validationService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());

        return new ResponseEntity<ProjectTask>(projectTask1,HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id, Principal principal){
        return projectTaskService.findBackLogbyID(backlog_id, principal.getName());
    }

    @GetMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){
        ProjectTask projectTask = projectTaskService.findTaskBySequence(backlog_id, pt_id, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,BindingResult result, @PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){

        ResponseEntity<?> errorMap = validationService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        ProjectTask updateProjectTask = projectTaskService.updateByProjectID(projectTask, backlog_id, pt_id, principal.getName());

        return new ResponseEntity<ProjectTask>(updateProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){

        projectTaskService.deleteProjectTaskById(backlog_id, pt_id, principal.getName());

        return new ResponseEntity<String>("Project "+pt_id+" has been deleted", HttpStatus.OK);
    }
}
