import React, { Fragment, useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(1);
                setError("");
                setProjects(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    const saveProject = (project: Project) => {
        let updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    };

    return (
        <>
        <h1>Projects</h1>
        <ProjectList onSave={saveProject} projects={projects} />
        </>
    );
}

export default ProjectsPage;