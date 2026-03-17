"use client";

import { Button } from "@/components/ui/button"
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button onClick={() => createProject({ 
        name: "New Project" 
      })}>
        Create Project
      </Button>

      <div className="flex flex-col gap-2">
        {projects?.map((project) => (
          <div className="border rounded p-2 flex flex-col" key={project._id}>
            <p className="font-bold text-lg">{project.name}</p>
            <p className="text-sm text-muted-foreground">OwnerId: {project.ownerId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

