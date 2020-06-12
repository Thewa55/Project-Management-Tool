package com.Kenny.ppmtools.services;

import com.Kenny.ppmtools.domain.Backlog;
import com.Kenny.ppmtools.domain.ProjectTask;
import com.Kenny.ppmtools.repositories.BacklogRepository;
import com.Kenny.ppmtools.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        projectTask.setBacklog(backlog);

        Integer BacklogSequence = backlog.getPTSequence();
        BacklogSequence++;

        projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
//        if(projectTask.getPriority() == 0 || projectTask.getPriority() == null){
//            projectTask.setPriority(3);
//        }

        if(projectTask.getStatus() == "" || projectTask.getStatus() == null){
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }
}
