package com.Kenny.ppmtools.services;

import com.Kenny.ppmtools.domain.Backlog;
import com.Kenny.ppmtools.domain.Project;
import com.Kenny.ppmtools.domain.ProjectTask;
import com.Kenny.ppmtools.exceptions.ProjectNotFoundException;
import com.Kenny.ppmtools.repositories.BacklogRepository;
import com.Kenny.ppmtools.repositories.ProjectRepository;
import com.Kenny.ppmtools.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username){

        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();

            projectTask.setBacklog(backlog);

            Integer BacklogSequence = backlog.getPTSequence();
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);
            projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null || projectTask.getPriority() == 0 ){
                projectTask.setPriority(3);
            }

            if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBackLogbyID(String id, String username){

        projectService.findProjectByIdentifier(id, username);

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findTaskBySequence(String backlog_id, String pt_id, String username){

        projectService.findProjectByIdentifier(backlog_id, username);

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask==null){
            throw new ProjectNotFoundException("Project task "+pt_id+" does not exist");
        }

        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("Project task "+pt_id+" does not exist in project "+backlog_id);
        }

        return projectTask;
    }

    public ProjectTask updateByProjectID(ProjectTask updatedTask, String backlog_id, String pt_id, String username){
        ProjectTask projectTask = findTaskBySequence(backlog_id, pt_id, username);

        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTaskById(String backlog_id, String pt_id, String username){
        ProjectTask projectTask = findTaskBySequence(backlog_id, pt_id, username);
        projectTaskRepository.delete(projectTask);
    }
}
