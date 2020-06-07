package com.Kenny.ppmtools.services;

import com.Kenny.ppmtools.repositories.ProjectRepository;
import com.Kenny.ppmtools.domain.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){


        return projectRepository.save(project);
    }
}
