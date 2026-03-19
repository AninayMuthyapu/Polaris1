import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-projects";

import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { AlertCircleIcon, ArrowRightIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import { Kbd } from "@/components/ui/kbd";

import { Button } from "@/components/ui/button";

import { Doc } from "../../../../convex/_generated/dataModel";
import { link } from "fs";



interface ProjectsListProps{
    onViewAll:()=>void;
}




const ProjectItem=({data}:){
    data:Doc
}:{
    data:Doc<'projects'>
})=>{
    <link href={`/projects/${data._id}`}>
}







export const ProjectsList = ({ 
  onViewAll
}: ProjectsListProps) => {
  const projects = useProjectsPartial(6);

  if (projects === undefined) {
    return <Spinner className="size-4 text-ring" />
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4">
      {mostRecent ? <ContinueCard data={mostRecent} /> : null}
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Recent projects
            </span>
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              <span>View all</span>
              <Kbd className="bg-accent border">
                ⌘K
              </Kbd>
            </button>
          </div>
          <ul className="flex flex-col">
            {rest.map((project) => (
              <ProjectItem
                key={project._id}
                data={project}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};